import React, { Component } from "react";
import LeftContainer from "../LeftContainer";
import { Container } from "react-bootstrap";
import RightContainer from "../RightContainer";
import "../../styles/Profile.css";
import { BsArrowLeft, BsCalendar } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { GiBalloons } from "react-icons/gi";
import { connect } from "react-redux";
import MyTweets from "./MyTweets";
import Media from "./Media";
import Likes from "./Likes";
import axios from "axios";

import Modal from "react-modal";

const mapStateToProps = (state) => state;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: "tweets",
      user: this.props.match.params.username,
      userInfo: "",
      showEdit: false,
      image: null,
    };
    this.inputRef = React.createRef();
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
  updateInfo = (e) => {
    let userInfo = this.state.userInfo;
    let id = e.currentTarget.id;
    userInfo[id] = e.currentTarget.value;
    this.setState({ userInfo });
  };
  handleImageInput = (e) => {
    this.inputRef.current.click();
  };
  imageSelected = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("picture", file);
    this.setState({
      image: formData,
    });
  };
  editUser = async (e) => {
    e.preventDefault();
    let editInfo = {
      method: "PUT",
      url: await `http://localhost:3003/profiles/${this.state.userInfo._id}`,
      headers: {
        username: this.props.user.username,
        "Access-Control-Allow-Origin": "http://127.0.0.1:3000/",
      },
      data: this.state.userInfo,
    };

    let tweetResponse = await axios(editInfo);
    let userImage = {
      method: "POST",
      url: await `http://localhost:3003/profiles/${this.state.userInfo._id}/uploadImage`,
      headers: {
        username: this.props.user.username,
        "Access-Control-Allow-Origin": "http://127.0.0.1:3000/",
      },
      data: this.state.image,
    };
    let userImageResponse = await axios(userImage);
    console.log(userImageResponse);
    alert("changed sucessfully");
    this.setState({ userInfo: null, showEdit: false });
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
              {this.state.userInfo.username === this.props.username ? (
                <button onClick={() => this.setState({ showEdit: true })}>
                  Edit Profile
                </button>
              ) : (
                <button>Follow</button>
              )}
            </div>
            <div id="info">
              <p>{this.state.userInfo.name}</p>
              <p>@{this.state.userInfo.username}</p>
              <div id="dates">
                {this.state.userInfo.area ? (
                  <p>
                    <FiMapPin /> {this.state.userInfo.area}
                  </p>
                ) : null}
                {this.state.userInfo.dob ? (
                  <p>
                    <GiBalloons /> {this.state.userInfo.dob}
                  </p>
                ) : null}
                {this.state.userInfo.createdAt ? (
                  <p>
                    <BsCalendar /> {this.state.userInfo.createdAt.slice(0, 10)}
                  </p>
                ) : null}
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

        {/* edit profile modal */}
        <Modal
          isOpen={this.state.showEdit}
          onRequestClose={() => this.setState({ showEdit: false })}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div id="editProfile">
            <div id="heading">
              <div>
                <AiOutlineClose
                  onClick={() => this.setState({ showEdit: false })}
                />
                <p>Edit profile</p>
              </div>
              <button onClick={this.editUser}>Save</button>
            </div>
            <hr style={{ marginTop: "0.2rem ", marginBottom: "0.2rem" }} />
            <div id="bgImage"></div>
            <div id="image">
              <img
                onClick={this.handleImageInput}
                src={`data:image/jpeg;base64,${this.state.userInfo.image}`}
                alt=""
              />
              <input
                ref={this.inputRef}
                style={{ display: "none" }}
                type="file"
                name="picture"
                onChange={this.imageSelected}
              />
            </div>
            <div id="info">
              <div className="inputDivs">
                <p>Name</p>
                <input
                  onChange={this.updateInfo}
                  id="name"
                  type="text"
                  required
                  value={this.state.userInfo.name}
                />
              </div>
              <div className="inputDivs">
                <p>Location</p>
                <input
                  onChange={this.updateInfo}
                  id="area"
                  type="text"
                  required
                  value={this.state.userInfo.area}
                />
              </div>
              <p style={{ marginTop: "10px" }}>Date of Birth</p>
              <input id="dob" onChange={this.updateInfo} type="date" />
            </div>
          </div>
        </Modal>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Profile);
