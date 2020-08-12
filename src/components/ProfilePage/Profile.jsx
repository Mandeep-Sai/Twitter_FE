import React, { Component } from "react";
import LeftContainer from "../LeftContainer";
import { Container } from "react-bootstrap";
import RightContainer from "../RightContainer";
import "../../styles/Profile.css";
import { BsArrowLeft, BsCalendar } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { GiBalloons } from "react-icons/gi";
import { connect } from "react-redux";
import MyTweets from "./MyTweets";
import Media from "./Media";
import Likes from "./Likes";
const mapStateToProps = (state) => state;

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: "tweets",
      user: this.props.match.params.username,
      userInfo: "",
    };
  }
  bufferToBase64 = (buf) => {
    var binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  };
  componentDidMount = async () => {
    let response = await fetch(
      `http://localhost:3003/profiles/${this.state.user}`
    );
    let userInfo = await response.json();
    const profileBase64 = this.bufferToBase64(userInfo.image.data);
    userInfo["image"] = profileBase64;
    this.setState({ userInfo });
  };
  componentDidUpdate = async (prevProps) => {
    if (prevProps.match.params.username !== this.props.match.params.username) {
      this.setState({ user: this.props.match.params.username });
      let response = await fetch(
        `http://localhost:3003/profiles/${this.props.match.params.username}`
      );
      let userInfo = await response.json();
      const profileBase64 = this.bufferToBase64(userInfo.image.data);
      userInfo["image"] = profileBase64;
      this.setState({ userInfo });
    }
  };
  render() {
    return (
      <Container id="profile">
        <div>
          {this.state.user === this.props.username ? (
            <LeftContainer active="userInfo" />
          ) : (
            <LeftContainer />
          )}
        </div>
        <div>
          <Container id="userInfo">
            <div id="navBar">
              <div>
                <BsArrowLeft />
              </div>
              <div id="name">
                <p>{this.state.userInfo.name}</p>
                <p>tweets length</p>
              </div>
            </div>
            <div id="bgImage"></div>
            <div id="image">
              <img
                src={`data:image/jpeg;base64,${this.state.userInfo.image}`}
                alt=""
              />
              <button>Edit Profile</button>
            </div>
            <div id="info">
              <p>{this.state.userInfo.name}</p>
              <p>@{this.state.userInfo.username}</p>
              <div id="dates">
                <p>
                  <FiMapPin /> {this.state.userInfo.area}
                </p>
                <p>
                  <GiBalloons /> Born 15 Aug 1996
                </p>
                <p>
                  <BsCalendar /> {this.state.userInfo.createdAt}
                </p>
              </div>
              <div id="followers">
                <p>
                  <span style={{ fontWeight: "650", color: "black" }}>7</span>{" "}
                  Following
                </p>
                <p>
                  <span style={{ fontWeight: "650", color: "black" }}>7B</span>{" "}
                  Followers
                </p>
              </div>
            </div>
            <div id="myTweets">
              <div
                onClick={() => this.setState({ active: "tweets" })}
                className={this.state.active === "tweets" ? "active" : null}
              >
                Tweets
              </div>
              <div
                onClick={() => this.setState({ active: "replies" })}
                className={this.state.active === "replies" ? "active" : null}
              >
                Tweets & replies
              </div>
              <div
                onClick={() => this.setState({ active: "media" })}
                className={this.state.active === "media" ? "active" : null}
              >
                Media
              </div>
              <div
                onClick={() => this.setState({ active: "likes" })}
                className={this.state.active === "likes" ? "active" : null}
              >
                Likes
              </div>
            </div>
            {this.state.active === "tweets" ? (
              <MyTweets userId={this.state.user} />
            ) : null}
            {this.state.active === "media" ? <Media /> : null}
            {this.state.active === "likes" ? <Likes /> : null}
          </Container>
        </div>
        <div>
          <RightContainer />
        </div>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Profile);
