import React, { useState } from "react";
import "./App.css";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Other/Navbar";
import User from "./components/Other/UserAccountSetting";
import GiftCard from "./components/GiftCard/GiftCard";
import InstacartPlus from "./components/Other/InstacartPlus";
import ManagePromo from "./components/Other/ManagePromo";
import CategoryListPage from "./components/Other/CategoryListPage";
import PopularGift from "./components/Other/PopularGift";
import PopularGiftSecondPage from "./components/Other/PopularGiftSecondPage";
import StoreDetailsInfoPage from "./components/Store/StoreInformation";
import Checkout from "./components/Checkout/Checkout";
import StoreItemInfo from "./components/Store/StoreProducts";
import GiftCardNav from "./components/GiftCard/GiftCardNav";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "./store/action/authActions";
import { toast } from "react-toastify";
import Favorite from "./components/Store/Favorite";
import AllOrders from "./components/Store/AllOrders";
import OrderDetails from "./components/Store/OrderDetails";
import List from "./components/Other/List";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const dispatch = useDispatch();

  const handleLoginClick = () => setShowLoginModal(true);
  const handleCloseModal = () => setShowLoginModal(false);
  const handleSignUpClick = () => setShowSignUpModal(true);
  const handleSignUpCloseModal = () => setShowSignUpModal(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("favorites");
    localStorage.removeItem("UserId");
    toast.success("Logout Successfully", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
    });
    dispatch(logoutSuccess());
    window.location.reload();
  };

  const authGuard = (Component) => {
    return isLoggedIn ? Component : <Navigate to="/" />;
  };

  const renderHeader = () => {
    const currentPath = window.location.pathname; // Get current path

    // List of paths where Navbar should be displayed
    const navbarPaths = [
      "/store/account/manage_promos",
      "/store/account/instacart-plus",
      "/store/checkout",
      "/p/gift-cards",
      "/store/account/manage_promos",
    ];

    if (!navbarPaths.includes(currentPath)) {
      return (
        <Navbar
          onLoginClick={handleLoginClick}
          onSignUpClick={handleSignUpClick}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
      );
    } else {
      return <GiftCardNav />;
    }
  };

  return (
    <div className="App">
      <Router>
        {renderHeader()}
        {showLoginModal && (
          <Login
            handleClose={handleCloseModal}
            handleOpen={handleLoginClick}
            handleSignUpClick={handleSignUpClick}
            handleLoginSuccess={handleLoginSuccess}
            showLoginModal={showLoginModal}
          />
        )}
        {showSignUpModal && (
          <SignUp
            handleCloseSignUpModal={handleSignUpCloseModal}
            handleOpen={handleSignUpClick}
            handleLoginClick={handleLoginClick}
            showSignUpModal={showSignUpModal}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Home isLoggedIn={isLoggedIn} handleLogin={handleLoginClick} />
            }
          />
          <Route
            path="/store/:storeId/storefront"
            element={authGuard(<StoreItemInfo />)}
          />
          <Route
            path="/store/userinformation/account"
            element={authGuard(<User />)}
          />
          <Route path="/store/orders" element={authGuard(<AllOrders />)} />
          <Route
            path="/store/orders/orderDetails/:order_id"
            element={authGuard(<OrderDetails />)}
          />
          <Route path="/p/gift-cards" element={<GiftCard />} />
          <Route
            path="store/account/instacart-plus"
            element={<InstacartPlus />}
          />
          <Route
            path="/store/account/manage_promos"
            element={<ManagePromo />}
          />
          <Route
            path="/store/category"
            element={authGuard(<CategoryListPage />)}
          />
          <Route
            path="/store/category/populargifts"
            element={authGuard(<PopularGift />)}
          />
          <Route
            path="/popular-gifts/category/:index"
            element={authGuard(<PopularGiftSecondPage />)}
          />
          <Route path="/store/:id/info" element={<StoreDetailsInfoPage />} />
          <Route path="/store/checkout" element={authGuard(<Checkout />)} />
          <Route path="/favorites" element={authGuard(<Favorite />)} />
          <Route path="store/list" element={authGuard(<List />)} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
