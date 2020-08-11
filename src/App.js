import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import Login from "./components/Login";
import Home from "./components/Home/Home";
import Profile from "./components/ProfilePage/Profile";
import Lists from "./components/Lists/Lists";

function App() {
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

export default App;
