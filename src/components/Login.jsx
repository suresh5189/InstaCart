import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import ResetPassword from "./ResetPassword";
import { login } from "../apiServices";
import { useDispatch } from "react-redux";
import { setEmail,setPassword } from "../store/action/userActions";

const Login = ({
  handleClose,
  handleOpen,
  handleSignUpClick,
  handleLoginSuccess,
}) => {
  const refLogin = useRef(null);

  const dispatch = useDispatch();

  const [isResetOpen, setIsResetOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for tracking login status

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      setResponseMessage("Please Enter Email And Password");
      return;
    }
    setIsLoading(true);
    try {
      const response = await login(loginEmail, loginPassword);
      setResponseMessage(response.message || "Logged In Successfully");
      setIsLoggedIn(true); // Update login status
      handleLoginSuccess(); // Call the login success handler
      dispatch(setEmail(loginEmail));
      dispatch(setPassword(loginPassword));
    } catch (error) {
      console.error("Error Logging In", error.message);
      setResponseMessage(
        error.message || "Error Logging In. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickOutSide = (event) => {
    if (refLogin.current && !refLogin.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (handleOpen) {
      document.addEventListener("mousedown", handleClickOutSide);
    } else {
      document.removeEventListener("mousedown", handleClickOutSide);
    }
  });

  return (
    <>
      {!isResetOpen &&
        !isLoggedIn && ( // Only render if not resetting password and not logged in
          <>
            <div className="Overlay"></div>
            <div className="Login" ref={refLogin}>
              <div className="LoginInside">
                <div className="CloseIcon">
                  <IoClose onClick={handleClose} />
                </div>
                <h1>Log in</h1>
                <div className="IconButton">
                  <div className="Google">
                    <div className="GoogleIcon">
                      <FcGoogle size={24} />
                    </div>
                    <span className="GoogleText">Continue With Google</span>
                  </div>
                  <div className="Facebook">
                    <div className="FacebookIcon">
                      <ImFacebook2 size={24} />
                    </div>
                    <span className="FacebookText">Continue With Facebook</span>
                  </div>
                  <div className="Phone">
                    <div className="PhoneIcon">
                      <FaPhoneVolume size={24} />
                    </div>
                    <span className="PhoneText">Continue With Phone</span>
                  </div>
                </div>
                <div className="Horizontal">
                  <hr className="HorizontalLine" />
                  <span>or</span>
                  <hr className="HorizontalLine" />
                </div>
                <div className="Input">
                  <div className="Email">
                    <input
                      type="email"
                      name="email"
                      id="email"  
                      placeholder="Email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="Password">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="Forgot" onClick={() => setIsResetOpen(true)}>
                  Forgot password?{" "}
                  <span onClick={() => setIsResetOpen(true)}>Reset it</span>
                </div>
                <div className="LogButton">
                  <button
                    className="LoginButton"
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    <span>{isLoading ? "Loading..." : "Login"}</span>
                  </button>
                  {responseMessage && (
                    <p style={{ color: "red", textAlign: "center" }}>
                      {responseMessage}
                    </p>
                  )}
                </div>
                <div
                  style={{
                    borderBottom: "1px solid lightGrey",
                    margin: "10px",
                  }}
                ></div>
                <div className="Account">
                  <span>Don’t have an account?</span>
                  <span className="SignButton" onClick={handleSignUpClick}>
                    Sign up
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      {isResetOpen && (
        <ResetPassword
          isOpenModal={isResetOpen}
          handleCloseModal={() => setIsResetOpen(false)}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default Login;
