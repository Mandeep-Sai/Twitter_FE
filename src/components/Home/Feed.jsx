import React, { Component } from "react";
import "../../styles/Feed.css";
import { Container, Dropdown, Form } from "react-bootstrap";
import { WiStars } from "react-icons/wi";
import {
  AiOutlinePicture,
  AiOutlineFileGif,
  AiOutlineRetweet,
  AiOutlineHeart,
  AiOutlineClose,
} from "react-icons/ai";
import { FiBarChart, FiUpload } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import { GoCalendar } from "react-icons/go";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsChat } from "react-icons/bs";
import { connect } from "react-redux";
import Modal from "react-modal";
import axios from "axios";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
  return {
    getTweets: () => dispatch(fetchTweets()),

    removeTweet: (tweet) => dispatch(deleteTweet(tweet)),
  };
};
const bufferToBase64 = (buf) => {
  var binstr = Array.prototype.map
    .call(buf, function (ch) {
      return String.fromCharCode(ch);
    })
    .join("");
  return btoa(binstr);
};
const fetchTweets = () => {
  return async (dispatch, getState) => {
    let response = await fetch("http://localhost:3003/tweets");
    let tweets = await response.json();
    tweets.forEach((tweet) => {
      if (tweet.image) {
        const tweetbase64 = bufferToBase64(tweet.image.data);
        tweet.image = tweetbase64;
      }
      if (tweet.user.image) {
        const profilebase64 = bufferToBase64(tweet.user.image.data);
        tweet.user.image = profilebase64;
      }
    });
    if (response.ok) {
      dispatch({
        type: "GET_TWEETS",
        payload: tweets,
      });
    }
  };
};
const deleteTweet = (tweet) => {
  return async (dispatch, getState) => {
    let response = await fetch(`http://localhost:3003/tweets/${tweet._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("tweet deleted");
      dispatch({
        type: "DELETE_TWEET",
        payload: tweet._id,
      });
    }
  };
};
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
export class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweet: {
        text: "",
      },
      image: "",
      showDelete: false,
      showEdit: false,
      selectedTweet: "",
    };
    this.inputRef = React.createRef();
  }

  componentDidMount = async () => {
    setTimeout(() => {
      this.props.getTweets();
    }, 2000);
  };
  // image
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
  //
  tweetHandler = (e) => {
    let tweet = this.state.tweet;
    let id = e.currentTarget.id;
    tweet[id] = e.currentTarget.value;
    this.setState({ tweet });
  };
  sendTweet = async () => {
    //
    let tweet = {
      method: "POST",
      url: await `http://localhost:3003/tweets`,
      headers: {
        username: this.props.user.username,
        "Access-Control-Allow-Origin": "http://127.0.0.1:3003/",
      },
      data: this.state.tweet,
    };
    let tweetResponse = await axios(tweet);
    let tweetId = tweetResponse.data;
    console.log(tweetId);
    let tweetImage = {
      method: "POST",
      url: await `http://localhost:3003/tweets/${tweetId}`,
      headers: {
        username: this.props.user.username,
        "Access-Control-Allow-Origin": "http://127.0.0.1:3003/",
      },
      data: this.state.image,
    };
    let tweetImageResponse = await axios(tweetImage);
    this.setState({ tweet: { text: "" }, image: "" });
    this.props.getTweets();
  };
  //Editing a tweet
  editTweet = async () => {
    let editTweet = {
      method: "PUT",
      url: await `http://localhost:3003/tweets/${this.state.selectedTweet._id}`,
      headers: {
        username: this.props.user.username,
        "Access-Control-Allow-Origin": "http://127.0.0.1:3003/",
      },
      data: this.state.tweet,
    };

    let tweetResponse = await axios(editTweet);
    console.log(this.state.selectedTweet._id);
    /*
    let tweetId = tweetResponse.data;
    console.log(tweetId);
    */
    let tweetImage = {
      method: "POST",
      url: await `http://localhost:3003/tweets/${this.state.selectedTweet._id}`,
      headers: {
        username: this.props.user.username,
        "Access-Control-Allow-Origin": "http://127.0.0.1:3003/",
      },
      data: this.state.image,
    };
    let tweetImageResponse = await axios(tweetImage);
    this.setState({ tweet: { text: "" }, image: "", selectedTweet: "" });
    this.props.getTweets();
  };

  render() {
    return (
      <>
        <Container id="feed">
          <div id="createTweet">
            <div>
              <p>Home</p>

              <WiStars />
            </div>
            <hr style={{ margin: "0.5rem" }} />
            <div id="tweetingSection">
              <img
                src="https://stickershop.line-scdn.net/stickershop/v1/product/718/LINEStorePC/main.png;compress=true"
                alt=""
              />
              <input
                id="text"
                onChange={this.tweetHandler}
                placeholder="What's happening?"
                value={this.state.tweet.text}
                type="text"
              />
            </div>
            <div id="icons">
              <div>
                <AiOutlinePicture onClick={this.handleImageInput} />
                <input
                  ref={this.inputRef}
                  style={{ display: "none" }}
                  type="file"
                  name="picture"
                  onChange={this.imageSelected}
                />
                <AiOutlineFileGif />
                <FiBarChart />
                <FaRegSmile />
                <GoCalendar />
              </div>
              <div>
                <button onClick={this.sendTweet}>Tweet</button>
              </div>
            </div>
          </div>
          <hr
            style={{ margin: "0px", borderTop: "15px solid rgba(0,0,0,0.1)" }}
          />
          {this.props.tweets.map((tweet) => {
            return (
              <div className="tweet">
                <img
                  className="img-fluid"
                  src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
                  alt=""
                />
                <div className="content">
                  <div className="name">
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: "700" }}>
                        {tweet.user.name}{" "}
                        <span style={{ fontWeight: "400", color: "#9AA5AF" }}>
                          @{tweet.user.username}
                        </span>
                      </p>

                      <Dropdown>
                        <Dropdown.Toggle className="d-flex">
                          <div
                            className="dropdown"
                            onClick={() =>
                              this.setState({ showDropdown: true })
                            }
                          >
                            <MdKeyboardArrowDown />
                          </div>
                        </Dropdown.Toggle>

                        {tweet.user.username === this.props.user.username ? (
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() =>
                                this.setState({
                                  showEdit: true,
                                  selectedTweet: tweet,
                                })
                              }
                            >
                              Edit Tweet
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                this.setState({
                                  showDelete: true,
                                  selectedTweet: tweet,
                                })
                              }
                            >
                              Delete Tweet
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        ) : (
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              Not interested in this Tweet
                            </Dropdown.Item>

                            <Dropdown.Item>
                              Unfollow @{tweet.user.username}
                            </Dropdown.Item>
                            <Dropdown.Item>Add/remove from Lists</Dropdown.Item>
                            <Dropdown.Item>
                              Mute @{tweet.user.username}
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Block @{tweet.user.username}
                            </Dropdown.Item>
                            <Dropdown.Item>Embed Tweet</Dropdown.Item>
                            <Dropdown.Item>Report Tweet</Dropdown.Item>
                          </Dropdown.Menu>
                        )}
                      </Dropdown>
                    </div>
                    <p style={{ fontSize: "16px" }}>{tweet.text}</p>
                  </div>
                  {tweet.image ? (
                    <img
                      className="img-fluid"
                      src={`data:image/jpeg;base64,${tweet.image}`}
                      alt=""
                    />
                  ) : null}
                  <div className="icons">
                    <p>
                      <BsChat />{" "}
                      <span style={{ fontSize: "18px", marginLeft: "7px" }}>
                        7
                      </span>
                    </p>
                    <p>
                      <AiOutlineRetweet />{" "}
                      <span style={{ fontSize: "18px", marginLeft: "7px" }}>
                        7
                      </span>
                    </p>
                    <p>
                      <AiOutlineHeart />{" "}
                      <span style={{ fontSize: "18px", marginLeft: "7px" }}>
                        7
                      </span>
                    </p>
                    <p>
                      <FiUpload />{" "}
                      <span style={{ fontSize: "18px", marginLeft: "7px" }}>
                        7
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Modals */}
          <Modal
            isOpen={this.state.showDelete}
            onRequestClose={() =>
              this.setState({ showDelete: false, selectedTweet: "" })
            }
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div id="deleteTweet">
              <div id="heading">
                <h2>Are you sure ?</h2>
              </div>
              <div id="buttons">
                <button
                  onClick={() => {
                    this.props.removeTweet(this.state.selectedTweet);
                    this.setState({ showDelete: false, selectedTweet: "" });
                  }}
                >
                  Confirm
                </button>
                <button
                  onClick={() =>
                    this.setState({ showDelete: false, selectedTweet: "" })
                  }
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
          {/* edit modal */}
          <Modal
            isOpen={this.state.showEdit}
            onRequestClose={() =>
              this.setState({ showEdit: false, selectedTweet: "" })
            }
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div id="editTweet">
              <div id="heading">
                <h2>Edit your tweet</h2>
              </div>
              <div id="content">
                <textarea
                  type="text"
                  value={this.state.tweet.text}
                  onChange={this.tweetHandler}
                  placeholder="tweet"
                  id="text"
                />
                <input type="file" onChange={this.imageSelected} />
              </div>
              <div id="buttons">
                <button
                  onClick={() => {
                    this.editTweet();
                    this.setState({ showEdit: false });
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() =>
                    this.setState({ showEdit: false, selectedTweet: "" })
                  }
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </Container>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);