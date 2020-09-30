import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Toast } from "react-bootstrap";
import StartPage from "./components/StartPage";
import Login from "./components/Login";
import Home from "./components/Home/Home";
import Profile from "./components/ProfilePage/Profile";
import Lists from "./components/Lists/Lists";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import alanBtn from "@alan-ai/alan-sdk-web";
import { connect } from "react-redux";
import InProgress from "./components/InProgress";
import io from "socket.io-client";
import Notifications from "./components/Notifications";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
  return {
    searchUser: (username) =>
      dispatch({
        type: "SEARCH_USER",
        payload: username,
      }),
    updateLikes: (tweet) =>
      dispatch({
        type: "UPDATE_LIKES",
        payload: tweet,
      }),
    updateDislikes: (tweetId) =>
      dispatch({
        type: "UPDATE_DISLIKES",
        payload: tweetId,
      }),
    notificationCounter: () =>
      dispatch({
        type: "NOTIFICATION_COUNTER",
      }),
    addNotification: (notification) =>
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: notification,
      }),
  };
};

const alanKey = "";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredUser: "",
      showLikeToaster: false,
      likedBy: "",
      tweet: "",
    };
  }

  componentDidMount = async () => {
    console.log(process.env.REACT_APP_ALAN_KEY);
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: ({ command, username }) => {
        if (command === "fetchTweets") {
          window.location.href = `/home/${this.props.user.username}`;
        }
        if (command === "logout") {
          window.location.href = "/";
        }
        if (command === "profilePage") {
          window.location.href = `/userinfo/${this.props.user.username}`;
        }
        if (command === "fetchUser") {
          username = username.split(" ").join("");
          console.log(username);
          let filteredUser = this.props.users.filter((user) =>
            user.username.toLowerCase().includes(username)
          );
          //  this.setState({ filteredUser });
          this.props.searchUser(filteredUser[0].username);
          window.location.href = `/userinfo/${this.props.searchUsername}`;
        }
      },
    });
  };
  componentDidUpdate = () => {
    if (this.props.user.username !== null) {
      const connOpt = {
        transports: ["websocket"],
      };
      this.socket = io("http://localhost:3003", connOpt);
      this.socket.on("connect", () => {
        this.socket.emit("info", {
          username: this.props.user.username,
        });
      });
      this.socket.on(
        "notification",
        ({ tweetedBy, likedBy, tweetText, tweetId }) => {
          if (likedBy !== this.props.user.name) {
            this.setState({
              likedBy: likedBy,
              tweet: tweetText,
            });
            if (this.props.activePage !== "notifications") {
              this.props.notificationCounter();
              this.setState({
                showLikeToaster: true,
              });
            }
            let notification = `${this.state.likedBy} liked your recent tweet
            ${this.state.tweet}`;
            this.props.addNotification(notification);
          }
        }
      );
      this.socket.on("increaseLikes", async ({ tweetId }) => {
        let response = await fetch("http://localhost:3003/tweets/addLike", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ tweetId }),
          headers: new Headers({
            "content-type": "application/json",
          }),
        });
        if (response.ok) {
          this.props.updateLikes(tweetId);
        }
      });
      this.socket.on("decreaseLikes", async ({ tweetId }) => {
        let response = await fetch("http://localhost:3003/tweets/removeLike", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ tweetId }),
          headers: new Headers({
            "content-type": "application/json",
          }),
        });
        if (response.ok) {
          this.props.updateDislikes(tweetId);
        }
      });
    }
  };
  sendLike = (username, name, tweetText, tweetId) => {
    this.socket.emit("likeAdded", {
      tweetedBy: username,
      likedBy: name,
      tweetText: tweetText,
      tweetId: tweetId,
    });
  };
  updateLikesForAll = (tweetId) => {
    this.socket.emit("updateLikes", {
      tweetId: tweetId,
    });
  };
  updateDislikesForAll = (tweetId) => {
    this.socket.emit("updateDislikes", {
      tweetId: tweetId,
    });
  };

  render() {
    return (
      <Router>
        <Route path="/" exact component={StartPage} />
        <Route path="/login" exact component={Login} />
        <Route
          path="/home/me"
          exact
          render={(props) => (
            <Home
              {...props}
              likeFunc={this.sendLike}
              updateLikesFunc={this.updateLikesForAll}
              updateDislikesFunc={this.updateDislikesForAll}
            />
          )}
        />
        <Route path="/userinfo/:username" exact component={Profile} />
        <Route path="/:username/lists" exact component={Lists} />
        <Route path="/:username/bookmarks" exact component={Bookmarks} />
        <Route path="/hashtags" exact component={InProgress} />
        <Route path="/notifications" exact component={Notifications} />
        <Route path="/messages" exact component={InProgress} />

        <Toast
          style={{ position: "absolute", top: "20px", right: "20px" }}
          onClose={() => this.setState({ showLikeToaster: false })}
          show={this.state.showLikeToaster}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="mr-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>
            {this.state.likedBy} liked your recent tweet{" "}
            <strong>{this.state.tweet}</strong>
          </Toast.Body>
        </Toast>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
