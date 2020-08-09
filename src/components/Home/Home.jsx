import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftContainer from "../LeftContainer";
import RightContainer from "../RightContainer";
import "../../styles/Home.css";
import Feed from "./Feed";

export class Home extends Component {
  render() {
    return (
      <Container id="home">
        <div>
          <LeftContainer />
        </div>
        <div>
          <Feed />
        </div>
        <div>
          <RightContainer />
        </div>
      </Container>
    );
  }
}

export default Home;
