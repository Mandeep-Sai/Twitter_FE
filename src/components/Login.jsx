import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../styles/Login.css";

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
    this.props.history.push(`/home/${this.state.user.username}`);
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

export default Login;
