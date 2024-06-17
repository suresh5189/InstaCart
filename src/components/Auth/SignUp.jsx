import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { sendOTPRegister } from "../../apiServices";
import VerifyOTP from "./VerifyOTP";
import { ErrorMessage, Field, Form, Formik } from "formik";

const SignUp = ({
  handleCloseSignUpModal,
  handleOpen,
  handleLoginClick,
  isLoggedIn,
}) => {
  const refSignup = useRef(null);

  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [otpid, setOtpid] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const handleRegister = async (values) => {
    const { email } = values;
    setEmail(email);
    if (!email) {
      setResponseMessage("Please Enter Your Email.");
      return;
    }
    try {
      setIsOTPSent(true);
      const response = await sendOTPRegister(email);
      const { otpid } = response.data;
      setResponseMessage(response.message || "Register Successfully");
      setOtpid(otpid);
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

  console.log(email);

  useEffect(() => {
    if (handleOpen) {
      document.addEventListener("mousedown", handleClickOutsideSignUp);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideSignUp);
    }
  });

  useEffect(() => {
    // Update isLogged state based on isLoggedIn prop
    setIsLogged(isLoggedIn);
  }, [isLoggedIn]);

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
              <Formik
                initialValues={{ email: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Required Email";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid Email Address";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleRegister(values);
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="Form">
                    <div className="Input">
                      <div className="InputText">
                        <span className="InputTextTitle">
                          Enter your email to get started.
                        </span>
                      </div>
                      <div className="Email">
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{ color: "red" }}
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
                          disabled={isOTPSent || isLogged || isSubmitting}
                          type="submit"
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
                  </Form>
                )}
              </Formik>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <div className="Account">
                {!isLogged && ( // Only render if not logged in
                  <>
                    <span>Don’t have an account?</span>
                    <span className="SignButton" onClick={handleLoginClick}>
                      Log in
                    </span>
                  </>
                )}
              </div>
            </>
          ) : (
            <VerifyOTP
              email={email}
              otpid={otpid}
              onVerificationSuccess={handleCloseSignUpModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
