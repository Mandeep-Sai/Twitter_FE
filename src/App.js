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

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
  return {
    searchUser: (username) =>
      dispatch({
        type: "SEARCH_USER",
        payload: username,
      }),
  };
};

const alanKey =
  "4e61d43e595528115453bb1e217c43372e956eca572e1d8b807a3e2338fdd0dc/stage";
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
    alanBtn({
      key: alanKey,
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
  componentDidUpdate = (prevProps) => {
    if (prevProps.user.username !== " ") {
      const connOpt = {
        transports: ["websocket"],
      };
      this.socket = io("http://localhost:3004", connOpt);
      this.socket.on("connect", () => {
        this.socket.emit("info", {
          username: this.props.user.username,
        });
      });
      this.socket.on("notification", ({ tweetedBy, likedBy, tweet }) => {
        console.log(`${likedBy} liked your recent tweet "${tweet}"`);
        this.setState({
          likedBy: likedBy,
          tweet: tweet,
          showLikeToaster: true,
        });
      });
    }
  };
  sendLike = (username, name, tweet) => {
    this.socket.emit("likeAdded", {
      tweetedBy: username,
      likedBy: name,
      tweet: tweet,
    });
  };

  render() {
    return (
      <Router>
        <Route path="/" exact component={StartPage} />
        <Route path="/login" exact component={Login} />
        {/* <Route path="/home/me" exact component={Home} /> */}
        <Route
          path="/home/me"
          exact
          render={(props) => <Home {...props} likeFunc={this.sendLike} />}
        />
        <Route path="/userinfo/:username" exact component={Profile} />
        <Route path="/:username/lists" exact component={Lists} />
        <Route path="/:username/bookmarks" exact component={Bookmarks} />
        <Route path="/hashtags" exact component={InProgress} />
        <Route path="/notifications" exact component={InProgress} />
        <Route path="/messages" exact component={InProgress} />

        <Toast
          style={{ position: "absolute", top: "0", right: "0" }}
          onClose={() => this.setState({ showLikeToaster: false })}
          show={this.state.showLikeToaster}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="mr-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>
            {this.state.likedBy} liked your recent tweet "{this.state.tweet}"
          </Toast.Body>
        </Toast>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

/* 
 useEffect(() => {
    console.log(props);
    alanBtn({
      key: alanKey,
      onCommand: ({ command, profile }) => {
        if (command === "fetchTweets") {
          console.log(username);
          window.location.href = `/home/${username}`;
        }
        if (command === "fetchProfile") {
          // console.log(profile);
          let username = profile.username;
          window.location.href = `/userinfo/${username}`;
        }
      },
    });
  }, []);
  useEffect(() => {
    setUsername(props.user.username);
  }, [props.user]);
*/
