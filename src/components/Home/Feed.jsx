import React, { Component } from "react";
import "../../styles/Feed.css";
import { Container, Dropdown } from "react-bootstrap";
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

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (posts) => {
      dispatch({
        type: "GET_POSTS",
        payload: posts,
      });
    },
    deletePost: (post) => dispatch(deleteTweet(post)),
  };
};
const deleteTweet = (post) => {
  return async (dispatch, getState) => {
    let response = await fetch(`http://localhost:3003/tweets/${post._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("tweet deleted");
      dispatch({
        type: "DELETE_POST",
        payload: post._id,
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
      showDelete: false,
      selectedPost: "",
    };
  }
  componentDidMount = async () => {
    let response = await fetch("http://localhost:3003/tweets");
    let posts = await response.json();
    setTimeout(() => {
      this.props.getPosts(posts);
    }, 2000);
  };

  tweetHandler = (e) => {
    let tweet = this.state.tweet;
    let id = e.currentTarget.id;
    tweet[id] = e.currentTarget.value;
    this.setState({ tweet });
  };
  sendTweet = async () => {
    let response = await fetch("http://localhost:3003/tweets", {
      method: "POST",
      body: JSON.stringify(this.state.tweet),
      headers: new Headers({
        username: this.props.user.username,
        "Content-type": "application/json",
      }),
    });
    if (response.ok) {
      alert("tweet done");
      this.setState({ tweet: { text: "" } });
    }
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
                type="text"
              />
            </div>
            <div id="icons">
              <div>
                <AiOutlinePicture />
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
          {this.props.posts.map((post) => {
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
                        {post.user.name}{" "}
                        <span style={{ fontWeight: "400", color: "#9AA5AF" }}>
                          @{post.user.username}
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

                        {post.user.username === this.props.user.username ? (
                          <Dropdown.Menu>
                            <Dropdown.Item>Edit Post</Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                this.setState({
                                  showDelete: true,
                                  selectedPost: post,
                                })
                              }
                            >
                              Delete Post
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        ) : (
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              Not interested in this Tweet
                            </Dropdown.Item>

                            <Dropdown.Item>
                              Unfollow @{post.user.username}
                            </Dropdown.Item>
                            <Dropdown.Item>Add/remove from Lists</Dropdown.Item>
                            <Dropdown.Item>
                              Mute @{post.user.username}
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Block @{post.user.username}
                            </Dropdown.Item>
                            <Dropdown.Item>Embed Tweet</Dropdown.Item>
                            <Dropdown.Item>Report Tweet</Dropdown.Item>
                          </Dropdown.Menu>
                        )}
                      </Dropdown>
                    </div>
                    <p style={{ fontSize: "16px" }}>{post.text}</p>
                  </div>
                  {post.image ? (
                    <img className="img-fluid" src={post.image} alt="" />
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
              this.setState({ showDelete: false, selectedPost: "" })
            }
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
              <h2>Are you sure ?</h2>
            </div>
            <div>
              <button
                onClick={() => {
                  this.props.deletePost(this.state.selectedPost);
                  this.setState({ showDelete: false, selectedPost: "" });
                }}
              >
                Confirm
              </button>
              <button
                onClick={() =>
                  this.setState({ showDelete: false, selectedPost: "" })
                }
              >
                Close
              </button>
            </div>
          </Modal>
        </Container>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
