import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/StartPage.css";
import { IconContext } from "react-icons";
import { RiSearchLine, RiChat1Line } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";

export default function StartPage() {
  return (
    <Container id="startPage">
      <Row id="main">
        <Col xs={6} id="leftColumn">
          <img
            className="img-fluid"
            src="https://upload.wikimedia.org/wikipedia/de/thumb/9/9f/Twitter_bird_logo_2012.svg/1200px-Twitter_bird_logo_2012.svg.png"
            alt=""
          />
          <div id="content">
            <div>
              <IconContext.Provider value={{ className: "icons" }}>
                <p>
                  <RiSearchLine />
                </p>
              </IconContext.Provider>
              <p>Follow your interests.</p>
            </div>
            <div>
              <IconContext.Provider value={{ className: "icons" }}>
                <p>
                  <BsPeople />
                </p>
              </IconContext.Provider>
              <p>Hear what people are talking about.</p>
            </div>
            <div>
              <IconContext.Provider value={{ className: "icons" }}>
                <p>
                  <RiChat1Line />
                </p>
              </IconContext.Provider>
              <p>Join the conversation.</p>
            </div>
          </div>
        </Col>
        <Col xs={6} id="rightColumn">
          <div>
            <div id="content">
              <img
                src="https://upload.wikimedia.org/wikipedia/de/thumb/9/9f/Twitter_bird_logo_2012.svg/1200px-Twitter_bird_logo_2012.svg.png"
                alt=""
              />
              <p>See what's happening in the world right now</p>
              <div>
                <p>Join Twitter today.</p>
                <div id="buttons">
                  <button>Sign up</button>
                  <button>Log in</button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row id="footer">
        <div>
          <a href="/">About</a>
          <a href="/">Help Center</a>
          <a href="/">Terms</a>
          <a href="/">Privacy policy</a>
          <a href="/">Cookies</a>
          <a href="/">Imprint</a>
          <a href="/">Ads info</a>
          <a href="/">Blog</a>
          <a href="/">Status</a>
          <a href="/">Jobs</a>
          <a href="/">Brand</a>
          <a href="/">Advertise</a>
          <a href="/">Marketing</a>
          <a href="/">Businesses</a>
          <a href="/">Developers</a>
          <a href="/">Directory</a>
          <a href="/">Settings</a>
          <a href="/">2020 Twitter, Inc.</a>
        </div>
      </Row>
    </Container>
  );
}
