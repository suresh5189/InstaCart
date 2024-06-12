import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import StoreDetailScreen from "./components/StoreDetailScreen";
import Navbar from "./components/Navbar";
import User from "./components/UserAccountSetting";
import GiftCard from "./components/GiftCard/GiftCard";
import InstacartPlus from "./components/InstacartPlus";
import ManagePromo from "./components/ManagePromo";
import CategoryListPage from "./components/CategoryListPage";
import PopularGift from "./components/PopularGift";
import PopularGiftSecondPage from "./components/PopularGiftSecondPage";
import StoreDetails from "./components/StoreDetails";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  const handleSignUpCloseModal = () => {
    setShowSignUpModal(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("AccessToken");
    window.location.reload();
  };

  const authGuard = (Component) => {
    return isLoggedIn ? Component : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Router>
        {/* <StoreDetails /> */}
        <Navbar
          onLoginClick={handleLoginClick}
          onSignUpClick={handleSignUpClick}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
        {showLoginModal && (
          <Login
            handleClose={handleCloseModal}
            handleOpen={handleLoginClick}
            handleSignUpClick={handleSignUpClick}
            handleLoginSuccess={handleLoginSuccess}
          />
        )}
        {showSignUpModal && (
          <SignUp
            handleCloseSignUpModal={handleSignUpCloseModal}
            handleOpen={handleSignUpClick}
            handleLoginClick={handleLoginClick}
          />
        )}
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route
            path="/storedetails/:storeId/front"
            element={authGuard(<StoreDetailScreen />)}
          />
          <Route
            path="/store/userinformation/account"
            element={authGuard(<User />)}
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
