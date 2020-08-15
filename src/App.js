import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import Login from "./components/Login";
import Home from "./components/Home/Home";
import Profile from "./components/ProfilePage/Profile";
import Lists from "./components/Lists/Lists";
import alanBtn from "@alan-ai/alan-sdk-web";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const alanKey =
  "4e61d43e595528115453bb1e217c43372e956eca572e1d8b807a3e2338fdd0dc/stage";
function App() {
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command }) => {
        if (command === "fetchTweets") {
          console.log("voice command");
          window.location.href = `/home/${this.props.username}`;
        }
      },
    });
  }, []);
  return (
    <Router>
      <Route path="/" exact component={StartPage} />
      <Route path="/login" exact component={Login} />
      <Route path="/home/:username" exact component={Home} />
      <Route path="/userinfo/:username" exact component={Profile} />
      <Route path="/:username/lists" exact component={Lists} />
    </Router>
  );
}

export default connect(mapStateToProps)(App);
