import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftContainer from "../LeftContainer";
import "../../styles/Home.css";
import RightContainer from "../RightContainer";
import Feed from "./Feed";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

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
      `http://localhost:3003/profiles/${this.props.match.params.username}`
    );
    let user = await response.json();
    user.image = this.bufferToBase64(user.image.data);
    if (response.ok) {
      this.setState({ user });
      this.props.getUser(this.state.user);
    }
  };

  render() {
    return (
      <Container id="home">
        <div>
          <LeftContainer active="home" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
