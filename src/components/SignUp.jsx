import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const SignUp = ({ handleCloseSignUpModal, handleOpen }) => {
  const [next, setNext] = useState(true);

  const refSignup = useRef(null);

  const handleContinue = () => {
    setNext(false);
  };

  const handleClickOutsideSignUp = (event) => {
    if (refSignup.current && !refSignup.current.contains(event.target)) {
      handleCloseSignUpModal();
    }
  };

  useEffect(() => {
    if (handleOpen) {
      document.addEventListener("mousedown", handleClickOutsideSignUp);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideSignUp);
    }
  }, [handleOpen]);

  return (
    <>
      <div className="Overlay"></div>
      <div className="SignUp" ref={refSignup}>
        <div className="SignUpInside">
          <div className="CloseIcon" onClick={handleCloseSignUpModal}>
            <IoClose />
          </div>
          <h1>Sign up</h1>
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
            <div className="InputText">
              <span className="InputTextTitle">
                Enter your email to get started.
              </span>
            </div>
            {next ? (
              <div className="Email">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </div>
            ) : (
              <div className="Password">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
            )}
          </div>
          <div className="Forgot">
            By continuing, you agree to our{" "}
            <span>Terms of Service, Privacy Policy & Health Data Notice.</span>
          </div>
          <div className="LogButton" onClick={handleContinue}>
            {next ? (
              <button className="SignUpButton">
                <span>Continue</span>
              </button>
            ) : (
              <button className="SignUpButton">
                <span>Sign up</span>
              </button>
            )}
          </div>
          <div
            style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
          ></div>
          <div className="Account">
            <span>Don’t have an account?</span>
            <span className="SignButton">Log in</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
