import React, { useState } from "react";
import Sidebar from "./Sidebar";
import InstaCartLogo from "../images/instacart.svg";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import NavbarList from "../data/navbarList";

function Navbar({ onLoginClick,onSignUpClick }) {
  const [hamburger, setHamburger] = useState(false);

  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleHamburger = () => {
    setHamburger(true);
  };

  const closeSidebar = () => {
    setHamburger(false);
  };

  return (
    <div className="navbar">
      <div className="HamburgerHeader">
        <div className="HamburgerHead">
          <div className="Hamburger" onClick={handleHamburger}>
            <RxHamburgerMenu size={20} className="HamBurgerIcon" />
          </div>
          {hamburger && <Sidebar closeSidebar={closeSidebar} isOpen={handleHamburger} />}
          <div>
            <img
              src={InstaCartLogo}
              alt="instacartLogo"
              className="logo"
              onClick={handleHome}
            />
          </div>
        </div>
        <div className="SearchContainer">
          <IoSearchOutline size={20} className="SearchIcon" />
          <input
            type="search"
            className="inputSearchBox"
            placeholder="Search products, stores and recipes"
          />
        </div>
        <div>
          <button className="loginButton" onClick={onLoginClick}>
            <span>Log in</span>
          </button>
          <button className="loginButton" onClick={onSignUpClick}>
            <span>Sign up</span>
          </button>
          <button className="signupButton">
            <FaShoppingCart size={24} />
          </button>
        </div>
      </div>
      <div className="NavbarScrollBar">
        <div class="HorizontalScrollBarWrapper Squares">
          {NavbarList.map(({ id, icon: Icon, text }) => {
            return (
              <div className="NavbarScrollBarList active" key={id}>
                <div className="NavbarScrollBarIcon">
                  <Icon size={28} />
                </div>
                <div className="NavbarScrollBarText">{text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
