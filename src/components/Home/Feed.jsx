import React, { Component } from "react";
import "../../styles/Feed.css";
import { Container } from "react-bootstrap";
import { WiStars } from "react-icons/wi";
import {
  AiOutlinePicture,
  AiOutlineFileGif,
  AiOutlineRetweet,
  AiOutlineHeart,
} from "react-icons/ai";
import { FiBarChart, FiUpload } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import { GoCalendar } from "react-icons/go";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsChat } from "react-icons/bs";

export class Feed extends Component {
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
                src="https://f0.pngfuel.com/png/636/141/computer-icons-user-s-included-png-clip-art.png"
                alt=""
              />
              <input placeholder="What's happening?" type="text" />
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
                <button>Tweet</button>
              </div>
            </div>
          </div>
          <hr
            style={{ margin: "0px", borderTop: "15px solid rgba(0,0,0,0.1)" }}
          />
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
                    Rare Beauty
                  </p>
                  <MdKeyboardArrowDown />
                </div>
                <p style={{ fontSize: "16px" }}>text</p>
              </div>
              <img
                className="img-fluid"
                src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
                alt=""
              />
              <div className="icons">
                <p>
                  <BsChat />{" "}
                  <span style={{ fontSize: "18px", marginLeft: "7px" }}>7</span>
                </p>
                <p>
                  <AiOutlineRetweet />{" "}
                  <span style={{ fontSize: "18px", marginLeft: "7px" }}>7</span>
                </p>
                <p>
                  <AiOutlineHeart />{" "}
                  <span style={{ fontSize: "18px", marginLeft: "7px" }}>7</span>
                </p>
                <p>
                  <FiUpload />{" "}
                  <span style={{ fontSize: "18px", marginLeft: "7px" }}>7</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

export default Feed;
