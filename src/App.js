import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import StoreDetailScreen from "./components/StoreDetailScreen";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

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

  return (
    <div className="App">
      <Router>
        <Navbar
          onLoginClick={handleLoginClick}
          onSignUpClick={handleSignUpClick}
        />
        {showLoginModal && (
          <Login handleClose={handleCloseModal} handleOpen={handleLoginClick} />
        )}
        {showSignUpModal && (
          <SignUp
            handleCloseSignUpModal={handleSignUpCloseModal}
            handleOpen={handleSignUpClick}
          />
        )}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/storedetails" element={<StoreDetailScreen />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
