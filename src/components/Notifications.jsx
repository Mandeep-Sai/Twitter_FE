import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import "../styles/Notifications.css";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
  return {
    updateActivePage: (page) =>
      dispatch({
        type: "UPDATE_ACTIVE_PAGE",
        payload: page,
      }),
    resetNotifications: () =>
      dispatch({
        type: "RESET_NOTIFICATIONS",
      }),
  };
};

class Notifications extends Component {
  componentDidMount() {
    let page = "notifications";
    this.props.updateActivePage(page);
    this.props.resetNotifications();
  }
  componentWillUnmount() {
    let page = "";
    this.props.updateActivePage(page);
  }
  render() {
    return (
      <>
        <Container id="notifications">
          <div>
            <LeftContainer />
          </div>
          <div id="content">
            <p>Notification 1</p>
            <p>Notification 2</p>
          </div>
          <div>
            <RightContainer />
          </div>
        </Container>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
