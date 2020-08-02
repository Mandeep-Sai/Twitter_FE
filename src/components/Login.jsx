import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../styles/Login.css";

export class Login extends Component {
  render() {
    return (
      <Container id="login">
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/de/thumb/9/9f/Twitter_bird_logo_2012.svg/1200px-Twitter_bird_logo_2012.svg.png"
            alt="logo"
          />
          <p>Log in to Twitter</p>
          <div id="username">
            <p>Phone,email or username</p>
            <input type="text" />
          </div>
          <div id="username">
            <p>Password</p>
            <input type="password" />
          </div>
          <button>Log in</button>
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
