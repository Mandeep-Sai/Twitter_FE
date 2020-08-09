import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftContainer from "../LeftContainer";
import RightContainer from "../RightContainer";
import "../../styles/Home.css";
import Feed from "./Feed";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => {
      dispatch({
        type: "GET_USERINFO",
        payload: user,
      });
    },
  };
};

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
    };
  }
  componentDidMount = async () => {
    let response = await fetch(
      `http://localhost:3003/profiles/${this.props.match.params.username}`
    );
    let user = await response.json();
    if (response.ok) {
      this.setState({ user });
      this.props.getUser(this.state.user);
    }
  };

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

export default connect(null, mapDispatchToProps)(Home);
