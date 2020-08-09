import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import Login from "./components/Login";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <Route path="/" exact component={StartPage} />
      <Route path="/login" exact component={Login} />
      <Route path="/home" exact component={Home} />
    </Router>
  );
}

export default App;
