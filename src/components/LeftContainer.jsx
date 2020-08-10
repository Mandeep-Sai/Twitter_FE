import React, { useState } from "react";
import "../styles/LeftContainer.css";
import { GoHome } from "react-icons/go";
import { FiHash, FiBell, FiMail, FiBookmark } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { BsCardText, BsThreeDots } from "react-icons/bs";
import { RiQuillPenLine } from "react-icons/ri";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = (state) => state;

function LeftContainer(props) {
  console.log(props);
  return (
    <div id="leftBar">
      <div id="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/de/thumb/9/9f/Twitter_bird_logo_2012.svg/1200px-Twitter_bird_logo_2012.svg.png"
          alt=""
        />
      </div>
      <div className={props.active === "home" ? "active" : null}>
        <Link to={`/home/${props.username}`}>
          <GoHome />
        </Link>
      </div>
      <div>
        <FiHash />
      </div>
      <div>
        <FiBell />
      </div>
      <div>
        <FiMail />
      </div>
      <div>
        <FiBookmark />
      </div>
      <div>
        <BsCardText />
      </div>
      <div className={props.active === "userInfo" ? "active" : null}>
        <Link to={`/userInfo/${props.username}`}>
          <AiOutlineUser />
        </Link>
      </div>
      <div>
        <BsThreeDots />
      </div>
      <div>
        <RiQuillPenLine />
      </div>
      <div id="profile">
        <img
          src="https://stickershop.line-scdn.net/stickershop/v1/product/718/LINEStorePC/main.png;compress=true"
          alt=""
        />
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(withRouter(LeftContainer));
