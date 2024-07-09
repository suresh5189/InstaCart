import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaPhoneVolume } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { sendOTPRegister } from "../../apiServices";
import VerifyOTP from "./VerifyOTP";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";

const SignUp = ({
  handleCloseSignUpModal,
  handleOpen,
  handleLoginClick,
  isLoggedIn,
  showSignUpModal,
}) => {
  const refSignup = useRef(null);

  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [otpid, setOtpid] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signWithPhone, setSignWithPhone] = useState(false);

  const countryOptions = [
    { value: "+91", label: "+91 - India" },
    { value: "+1", label: "+1 - United States" },
    { value: "+44", label: "+44 - United Kingdom" },
    { value: "+86", label: "+86 - China" },
    { value: "+81", label: "+81 - Japan" },
    { value: "+49", label: "+49 - Germany" },
    { value: "+7", label: "+7 - Russia" },
  ];

  const handleRegister = async (values) => {
    try {
      setIsOTPSent(true);
      let response;
      if (signWithPhone) {
        if (!selectedCountry) {
          throw new Error("Please select a country code.");
        }
        response = await sendOTPRegister({
          country_code: selectedCountry.value,
          phoneNumber,
        });
      } else {
        const { email } = values;
        setEmail(email);
        if (!email) {
          throw new Error("Please Enter Your Email.");
        }
        response = await sendOTPRegister({ email });
      }
      if (response && response.data) {
        const { otpid } = response.data;
        setResponseMessage(response.message || "Register Successfully");
        setOtpid(otpid);
      } else {
        throw new Error("Empty response received from server.");
      }
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSignUp);
    };
  }, [handleOpen]);

  useEffect(() => {
    // Update isLogged state based on isLoggedIn prop
    setIsOTPSent(false); // Reset isOTPSent when isLoggedIn changes
  }, [isLoggedIn]);

  const handleLoginWithPhone = () => setSignWithPhone(true);
  const handleLoginWithEmail = () => setSignWithPhone(false);

  return (
    <>
      <div className="Overlay"></div>
      <motion.div
        className="SignUp"
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{
          opacity: showSignUpModal ? 1 : 0,
          scale: showSignUpModal ? 1 : 0.1,
        }}
        transition={{ duration: 0.5 }}
        ref={refSignup}
      >
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
                {signWithPhone ? (
                  <div className="Phone" onClick={handleLoginWithEmail}>
                    <div className="PhoneIcon">
                      <MdEmail size={24} />
                    </div>
                    <span className="PhoneText">Continue With Email</span>
                  </div>
                ) : (
                  <div className="Phone" onClick={handleLoginWithPhone}>
                    <div className="PhoneIcon">
                      <FaPhoneVolume size={24} />
                    </div>
                    <span className="PhoneText">Continue With Phone</span>
                  </div>
                )}
              </div>
              <div className="Horizontal">
                <hr className="HorizontalLine" />
                <span>or</span>
                <hr className="HorizontalLine" />
              </div>
              {!signWithPhone ? (
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
                            disabled={isOTPSent || isLoggedIn || isSubmitting}
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
              ) : (
                <div className="RegisterWithPhone">
                  <div className="RegisterWithPhoneContainer">
                    <Select
                      value={selectedCountry}
                      onChange={setSelectedCountry}
                      options={countryOptions}
                      placeholder="Select Country Code"
                      className="CountryCodeFieldLogin"
                    />
                    <input
                      type="tel"
                      className="PhoneNumberInputLogin"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <div>
                      <button
                        className="SignUpButton"
                        onClick={handleRegister}
                        disabled={isOTPSent || isLoggedIn}
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
                </div>
              )}
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <div className="Account">
                {!isLoggedIn && ( // Only render if not logged in
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
              phoneno={phoneNumber}
              country_code={selectedCountry?.value}
              otpid={otpid}
              onVerificationSuccess={handleCloseSignUpModal}
              isPhoneSignUp={signWithPhone}
            />
          )}
        </div>
      </motion.div>
    </>
  );
};

export default SignUp;
