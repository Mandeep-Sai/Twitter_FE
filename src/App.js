import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StartPage from "./components/StartPage";

function App() {
  return (
    <Router>
      <Route path="/" exact component={StartPage} />
    </Router>
  );
}

export default App;
