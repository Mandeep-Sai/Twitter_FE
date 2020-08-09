import React from "react";
import "../styles/LeftContainer.css";
import { GoHome } from "react-icons/go";
import { FiHash, FiBell, FiMail, FiBookmark } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { BsCardText, BsThreeDots } from "react-icons/bs";
import { RiQuillPenLine } from "react-icons/ri";

export default function LeftContainer() {
  return (
    <div id="leftBar">
      <div id="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/de/thumb/9/9f/Twitter_bird_logo_2012.svg/1200px-Twitter_bird_logo_2012.svg.png"
          alt=""
        />
      </div>
      <div class="active">
        <GoHome />
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
      <div>
        <AiOutlineUser />
      </div>
      <div>
        <BsThreeDots />
      </div>
      <div>
        <RiQuillPenLine />
      </div>
      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
}
