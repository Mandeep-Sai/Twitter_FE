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
    };
  }

  render() {
    return (
      <Container id="profile">
        <div>
          <LeftContainer active="userInfo" />
        </div>
        <div>
          <Container id="userInfo">
            <div id="navBar">
              <div>
                <BsArrowLeft />
              </div>
              <div id="name">
                <p>Mandeep Sai</p>
                <p>tweets length</p>
              </div>
            </div>
            <div id="bgImage"></div>
            <div id="image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQ7CoqlHVkGqkv8cjCtNYY9pI99vjRVpugZg&usqp=CAU"
                alt=""
              />
              <button>Edit Profile</button>
            </div>
            <div id="info">
              <p>Mandeep Sai</p>
              <p>@bandi</p>
              <div id="dates">
                <p>
                  <FiMapPin /> Hanover, Lower Saxony
                </p>
                <p>
                  <GiBalloons /> Born 15 Aug 1996
                </p>
                <p>
                  <BsCalendar /> Joined Apr 14
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
            {this.state.active === "tweets" ? <MyTweets /> : null}
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
