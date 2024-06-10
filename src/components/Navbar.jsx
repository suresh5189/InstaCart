import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import InstaCartLogo from "../images/instacart.svg";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./CartScreen";
import { fetchCategoryList } from "../apiServices";

function Navbar({ onLoginClick, onSignUpClick, isLoggedIn, handleLogout }) {
  const [hamburger, setHamburger] = useState(false);
  const [cart, setCart] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategoryList();
        setCategories(data);
      } catch (error) {
        console.error("Error Fetching Categories", error);
      }
    };

    getCategories();
  }, []);

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

  const handleCart = () => {
    setCart(true);
  };

  const closeCart = () => {
    setCart(false);
  };

  return (
    <div className="navbar">
      <div className="HamburgerHeader">
        <div className="HamburgerHead">
          <div className="Hamburger" onClick={handleHamburger}>
            <RxHamburgerMenu size={20} className="HamBurgerIcon" />
          </div>
          {hamburger && (
            <Sidebar
              closeSidebar={closeSidebar}
              isOpen={handleHamburger}
              isLoggedIn={isLoggedIn}
            />
          )}
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
          {!isLoggedIn && (
            <>
              <button className="loginButton" onClick={onLoginClick}>
                <span>Log in</span>
              </button>
              <button className="loginButton" onClick={onSignUpClick}>
                <span>Sign up</span>
              </button>
            </>
          )}
          {isLoggedIn && (
            <button className="loginButton" onClick={handleLogout}>
              <span>Logout</span>
            </button>
          )}
          <button className="CartButton">
            <div className="CartIconButtonHead">
              <div className="CartIconButton" onClick={handleCart}>
                <FaShoppingCart size={24} className="CartIcon" />
              </div>
              {cart && <Cart size={24} closeCart={closeCart} />}
            </div>
          </button>
        </div>
      </div>
      {isLoggedIn && (
        <div className="NavbarScrollBar">
          <div className="HorizontalScrollBarWrapper Squares">
            {categories.map(({ id, name, imageUrl }) => (
              <div className="NavbarScrollBarList active" key={id}>
                <div className="NavbarScrollBarIcon">
                  <img src={imageUrl} alt={name} />
                </div>
                <div className="NavbarScrollBarText">{name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
