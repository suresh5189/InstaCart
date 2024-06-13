import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import InstaCartLogo from "../images/instacart.svg";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./CartScreen";
import { fetchCategoryList } from "../apiServices";
import { useSelector } from "react-redux";

function Navbar({ onLoginClick, onSignUpClick, isLoggedIn, handleLogout }) {
  const [hamburger, setHamburger] = useState(false);
  const [cart, setCart] = useState(false);
  const [categories, setCategories] = useState([]);

  const totalItems = useSelector((state) => state.cart.totalItems);
  // console.log(totalItems);

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
        <div style={{ display: "flex" }}>
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
          {isLoggedIn && (
            <button className="CartButton">
              <div className="CartIconButtonHead">
                <div className="CartIconButton" onClick={handleCart}>
                  <span>
                    <FaShoppingCart size={22} className="CartIcon" />
                  </span>
                  <span className="CartIconCount">{totalItems}</span>
                </div>
                {cart && (
                  <Cart
                    closeCart={closeCart}
                    isOpenCart={handleCart}
                  />
                )}
              </div>
            </button>
          )}
        </div>
      </div>
      {isLoggedIn && (
        <div className="NavbarScrollBar">
          <div className="HorizontalScrollBarWrapper Squares">
            {categories.map(({ id, name, imageUrl }) => (
              <Link
                className="NavbarScrollBarList active"
                key={id}
                to={
                  id !== 8
                    ? `/store/category?main_category_id=${id}`
                    : `/store/category/populargifts`
                }
              >
                <div className="NavbarScrollBarIcon">
                  <img src={imageUrl} alt={name} />
                </div>
                <div className="NavbarScrollBarText">{name}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
