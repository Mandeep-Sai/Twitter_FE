import React, { Component } from "react";
import { FiSearch, FiSettings } from "react-icons/fi";
import "../styles/RightContainer.css";

export class RightContainer extends Component {
  render() {
    return (
      <>
        <div id="rightBar">
          <div id="search">
            <FiSearch />
            <input placeholder="Search Twitter" type="text" />
          </div>
          <div id="trending">
            <div id="header">
              <p>Trends for you</p>
              <FiSettings />
            </div>
            <hr style={{ margin: "0px", marginTop: "0.5rem " }} />
            <div id="trendingHastag">
              <p>Trending in Germany</p>
              <p>#KILL MANDEEP</p>
              <p>1.5M Tweets</p>
            </div>
            <hr style={{ margin: "0px", marginTop: "0.5rem " }} />
            <div id="trendingHastag">
              <p>Trending in Germany</p>
              <p>#KILL MANDEEP</p>
              <p>1.5M Tweets</p>
            </div>
            <hr style={{ margin: "0px", marginTop: "0.5rem " }} />
            <div id="trendingHastag">
              <p>Trending in Germany</p>
              <p>#KILL MANDEEP</p>
              <p>1.5M Tweets</p>
            </div>
            <hr style={{ margin: "0px", marginTop: "0.5rem " }} />
            <div id="trendingHastag">
              <p>Trending in Germany</p>
              <p>#KILL MANDEEP</p>
              <p>1.5M Tweets</p>
            </div>
            <hr style={{ margin: "0px", marginTop: "0.5rem " }} />
            <p style={{ padding: "7px", color: "#1da1f2", margin: "0px" }}>
              Show more
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default RightContainer;
