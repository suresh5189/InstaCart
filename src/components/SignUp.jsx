import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { sendOTPRegister } from "../apiServices";
import VerifyOTP from "./VerifyOTP";

const SignUp = ({ handleCloseSignUpModal, handleOpen, handleLoginClick }) => {
  const refSignup = useRef(null);

  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);

  const handleRegister = async () => {
    if (!email) {
      setResponseMessage("Please Enter Your Email.");
      return;
    }
    try {
      setIsOTPSent(true);
      const response = await sendOTPRegister(email);
      setResponseMessage(response.message || "Register Successfully");
    } catch (error) {
      console.error("Error Registering", error.message);
      setResponseMessage(error.message);
      setIsOTPSent(false);
    }
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
  });

  return (
    <>
      <div className="Overlay"></div>
      <div className="SignUp" ref={refSignup}>
        <div className="SignUpInside">
          <div className="CloseIcon" onClick={handleCloseSignUpModal}>
            <IoClose />
          </div>
          <h1>Sign up</h1>
          {!isOTPSent ? (
            <>
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
                <div className="Email">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="Forgot">
                By continuing, you agree to our{" "}
                <span>
                  Terms of Service, Privacy Policy & Health Data Notice.
                </span>
              </div>
              <div className="LogButton">
                <div>
                  <button
                    className="SignUpButton"
                    onClick={handleRegister}
                    disabled={isOTPSent}
                  >
                    <span>{isOTPSent ? "Loading..." : "Sign up"}</span>
                  </button>
                  {responseMessage && (
                    <p style={{ color: "red", textAlign: "center" }}>
                      {responseMessage}
                    </p>
                  )}
                </div>
              </div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <div className="Account">
                <span>Don’t have an account?</span>
                <span className="SignButton" onClick={handleLoginClick}>
                  Log in
                </span>
              </div>
            </>
          ) : (
            <VerifyOTP
              email={email}
              onVerificationSuccess={handleCloseSignUpModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
