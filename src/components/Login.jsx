import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../styles/Login.css";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (username) =>
      dispatch({
        type: "SET_USERNAME",
        payload: username,
      }),
  };
};
export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        password: "",
      },
    };
  }
  userHandler = (e) => {
    let user = this.state.user;
    let id = e.currentTarget.id;
    user[id] = e.currentTarget.value;
    this.setState({ user });
  };

  loginHandler = async () => {
    let response = await fetch("http://localhost:3003/profiles/login", {
      headers: new Headers({
        "content-type": "application/json",
      }),
      credentials: "include",
      method: "POST",
      body: JSON.stringify(this.state.user),
    });
    if (response.ok) {
      //  const parsedResponse = await response.json();
      // localStorage.setItem("token", parsedResponse.jwt);
      // this.props.history.push("/me");
      // console.log(parsedResponse);
      this.props.setUser(this.state.user.username);
      setTimeout(() => {
        this.props.history.push(`/home/${this.state.user.username}`);
      }, 2000);
      // this.props.history.push(`/home`);
    } else {
      alert("Error");
    }
  };
  render() {
    return (
      <Container id="login">
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/de/thumb/9/9f/Twitter_bird_logo_2012.svg/1200px-Twitter_bird_logo_2012.svg.png"
            alt="logo"
          />
          <p>Log in to Twitter</p>
          <div id="user">
            <p>Phone,email or username</p>
            <input onChange={this.userHandler} id="username" type="text" />
          </div>
          <div id="user">
            <p>Password</p>
            <input onChange={this.userHandler} id="password" type="password" />
          </div>
          <button onClick={this.loginHandler}>Log in</button>
          <div id="bottomContent">
            <a href="/">Forgot password ?</a>
            <a href="/" style={{ margin: "0 5px" }}>
              {" "}
              .{" "}
            </a>
            <a href="/"> Sign up for Twitter</a>
          </div>
        </div>
      </Container>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);
