import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import ResetPassword from "./ResetPassword";

const Login = ({ handleClose, handleOpen, handleSignUpClick }) => {
  const refLogin = useRef(null);

  const [isResetOpen, setIsResetOpen] = useState(false);

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
      {!isResetOpen && (
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
                  />
                </div>
                <div className="Password">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="Forgot" onClick={() => setIsResetOpen(true)}>
                Forgot password?{" "}
                <span onClick={() => setIsResetOpen(true)}>Reset it</span>
              </div>
              <div className="LogButton">
                <button className="LoginButton">
                  <span>Log in</span>
                </button>
              </div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
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
