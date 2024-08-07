import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import InstaCartLogo from "../../images/instacart.svg";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../Store/CartScreen";
import { fetchCategoryList, searchStore } from "../../apiServices";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Navbar({ onLoginClick, onSignUpClick, isLoggedIn, handleLogout }) {
  const [hamburger, setHamburger] = useState(false);
  const [cart, setCart] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const searchRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery("");
        setSearchSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  const handleHome = () => navigate("/");
  const handleHamburger = () => setHamburger(true);
  const closeSidebar = () => setHamburger(false);
  const handleCart = () => setCart(true);
  const closeCart = () => setCart(false);

  const handleSearchInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() !== "") {
      try {
        const suggestions = await searchStore(query);
        const { matchingStores, matchingProducts } = suggestions.data;
        // console.log(suggestions);
        setSearchSuggestions({ matchingStores, matchingProducts });
        // console.log(suggestions.data);
      } catch (error) {
        console.error("Error Fetching Search Suggestions" || error);
      }
    } else {
      setSearchSuggestions({ matchingStores: [], matchingProducts: [] });
    }
  };

  const handleDetail = (store_id, image, title) => {
    if (!isLoggedIn) {
      setSearchQuery("");
      return onLoginClick(true);
    } else {
      navigate(`/store/${store_id}/storefront`, {
        state: { store_id, image, title },
      });
    }
  };

  function scrollLeft() {
    const scrollWrapper = document.querySelector(".NavbarScrollBarWrapper");
    scrollWrapper.scrollBy({
      left: -100, // Adjust scroll amount as necessary
      behavior: "smooth", // Smooth scrolling behavior
    });
  }

  function scrollRight() {
    const scrollWrapper = document.querySelector(".NavbarScrollBarWrapper");
    scrollWrapper.scrollBy({
      left: 100, // Adjust scroll amount as necessary
      behavior: "smooth", // Smooth scrolling behavior
    });
  }

  return (
    <div className="navbar">
      <div className="HamburgerHeader">
        <div className="HamburgerHead">
          <div className="Hamburger" onClick={handleHamburger}>
            <RxHamburgerMenu size={20} className="HamBurgerIcon" />
          </div>
          {hamburger && (
            <div>
              <Sidebar
                closeSidebar={closeSidebar}
                isOpen={handleHamburger}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                onLoginClick={onLoginClick}
                onSignUpClick={onSignUpClick}
              />
            </div>
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
        <div
          className={`SearchContainer ${isLoggedIn ? "isLogged" : ""}`}
          ref={searchRef}
        >
          <div>
            <IoSearchOutline size={20} className="SearchIcon" />
            <input
              type="search"
              // className="inputSearchBox"
              className={`inputSearchBox ${isLoggedIn ? "isLogged" : ""}`}
              placeholder="Search products, stores and recipes"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
          {searchQuery && (
            <>
              {/* <div className="Overlay"></div> */}
              <motion.div
                className="SearchBarDiv"
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{
                  opacity: searchQuery ? 1 : 0,
                  scale: searchQuery ? 1 : 0.1,
                }}
                transition={{ duration: 0.5 }}
              >
                {searchSuggestions.matchingStores &&
                  searchSuggestions.matchingStores.length > 0 && (
                    <>
                      <div className="SearchStoreTitle">
                        <span>Store</span>
                      </div>
                      <div className="searchSuggestions">
                        {searchSuggestions.matchingStores.map(
                          (store, index) => (
                            <div
                              key={index}
                              className="searchSuggestionItem"
                              onClick={() =>
                                handleDetail(
                                  store.store_id,
                                  store.store_logo,
                                  store.store_name
                                )
                              }
                            >
                              <img
                                src={store.store_logo}
                                alt={store.store_name}
                                className="SearchImage"
                              />
                              <div className="SearchSuggestionTitle">
                                <span>{store.store_name}</span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <div className="SearchHorizontalLine" />
                    </>
                  )}
                {searchSuggestions.matchingProducts &&
                  searchSuggestions.matchingProducts.length > 0 && (
                    <>
                      <div className="searchSuggestions">
                        <div className="SearchStoreTitle">
                          <span>Products</span>
                        </div>
                        {searchSuggestions.matchingProducts.map(
                          (productGroup, index) => (
                            <div>
                              {productGroup.products.map(
                                (product, subIndex) => (
                                  <div
                                    key={subIndex}
                                    className="searchSuggestionItem"
                                  >
                                    <img
                                      src={product.image}
                                      alt={product.title}
                                      className="SearchImage"
                                    />
                                    <div className="SearchSuggestionTitle">
                                      <span>{product.title}</span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
              </motion.div>
            </>
          )}
        </div>
        <div className="LoginAndSignUpButtonDiv" style={{ display: "flex" }}>
          {isLoggedIn && (
            <div>
              <button className="CartButton">
                <div className="CartIconButtonHead">
                  <div className="CartIconButton" onClick={handleCart}>
                    <span>
                      <FaShoppingCart size={22} className="CartIcon" />
                    </span>
                    <span className="CartIconCount">{totalItems}</span>
                  </div>
                  {cart && (
                    <Cart closeCart={closeCart} isOpenCart={handleCart} />
                  )}
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
      {isLoggedIn && (
        <>
          <div className="NavbarScrollBarWrapper">
            <div className="NavbarScrollBar">
              <div>
                <button
                  className="scrollButton left"
                  onClick={scrollLeft}
                ></button>
              </div>
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
              <div>
                <button
                  className="scrollButton right"
                  onClick={scrollRight}
                ></button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
