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
import User from "./components/User";

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
          <Route path="/" element={<Home />} />
          <Route
            path="/storedetails/:storeId/front"
            element={<StoreDetailScreen />}
          />
          <Route
            path="/store/userinformation/account"
            element={authGuard(<User />)}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
