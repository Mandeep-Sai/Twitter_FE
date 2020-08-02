import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Route path="/" exact component={StartPage} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
}

export default App;
