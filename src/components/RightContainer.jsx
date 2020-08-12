import React, { Component } from "react";
import { FiSearch, FiSettings } from "react-icons/fi";
import "../styles/RightContainer.css";
import { Link } from "react-router-dom";

export class RightContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      users: "",
      filteredUsers: "",
    };
  }
  updateQuery = (e) => {
    this.setState({ query: e.currentTarget.value });
    let filteredUsers = this.state.users.filter((user) =>
      user.name.toLowerCase().includes(this.state.query)
    );
    this.setState({ filteredUsers });
  };
  resetAll = () => {
    this.setState({ filteredUsers: "", query: "" });
  };
  componentDidMount = async () => {
    let response = await fetch(`http://localhost:3003/profiles`);
    let users = await response.json();

    this.setState({ users });
  };
  render() {
    return (
      <>
        <div id="rightBar">
          <div id="search">
            <FiSearch />
            <input
              onChange={this.updateQuery}
              placeholder="Search Twitter"
              type="text"
              value={this.state.query}
            />
          </div>

          {this.state.query.length > 1 ? (
            <div id="searchDropdown">
              {this.state.filteredUsers.length > 0 ? (
                this.state.filteredUsers.map((user) => {
                  return (
                    <>
                      <Link to={`/userInfo/${user.username}`}>
                        <p onClick={this.resetAll}>{user.name}</p>
                      </Link>
                    </>
                  );
                })
              ) : (
                <div>
                  <p>No results</p>
                </div>
              )}
            </div>
          ) : null}
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
