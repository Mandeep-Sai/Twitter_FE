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
            <hr style={{ margin: "0px", marginTop: "0.4rem " }} />
            <div id="trendingHastag">
              <p>Trending in Germany</p>
              <p>#KILL MANDEEP</p>
              <p>1.5M Tweets</p>
            </div>
            <hr style={{ margin: "0px", marginTop: "0.4rem " }} />
            <div id="trendingHastag">
              <p>Trending in Germany</p>
              <p>#KILL MANDEEP</p>
              <p>1.5M Tweets</p>
            </div>
            <hr style={{ margin: "0px", marginTop: "0.4rem " }} />
            <div id="trendingHastag">
              <p>Trending in Germany</p>
              <p>#KILL MANDEEP</p>
              <p>1.5M Tweets</p>
            </div>
            <hr style={{ margin: "0px", marginTop: "0.4rem " }} />
            <div id="trendingHastag">
              <p>Trending in Germany</p>
              <p>#KILL MANDEEP</p>
              <p>1.5M Tweets</p>
            </div>
            <hr style={{ margin: "0px", marginTop: "0.4rem " }} />
            <p style={{ padding: "7px", color: "#1da1f2", margin: "0px" }}>
              Show more
            </p>
          </div>
          {/* */}
          <div id="trending">
            <div id="header">
              <p>Who to follow</p>
            </div>
            <hr style={{ margin: "0px", marginTop: "0.4rem " }} />
            <div id="follow">
              <div>
                <img
                  src="https://w7.pngwing.com/pngs/745/539/png-transparent-nobita-nobi-illustration-nobita-nobi-doraemon-shizuka-minamoto-sewashi-animated-film-doraemon-nobi-doraemon-animated-film-thumbnail.png"
                  alt=""
                />
                <div>
                  <p>Nobita</p>
                  <p>@nobita</p>
                </div>
              </div>
              <button>Follow</button>
            </div>
            <hr style={{ margin: "0px", marginTop: "0.4rem " }} />

            <p style={{ padding: "7px", color: "#1da1f2", margin: "0px" }}>
              Show more
            </p>
          </div>
          <div id="footer">
            <div>
              <a href="/">Terms</a>
              <a href="/">Cookies</a>
              <a href="/">More</a>
              <a href="/">More</a>
              <a href="/">Twitter</a>
              <a href="/">Privacy policy</a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RightContainer;
