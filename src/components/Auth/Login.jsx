import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaPhoneVolume } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import ResetPassword from "./ResetPassword";
import {
  getUserDetails,
  login,
  refreshAccessToken,
  verifyOTPLogin,
} from "../../apiServices";
import { useDispatch } from "react-redux";
import { setEmail, updateProfile } from "../../store/action/userActions";
import { loginSuccess } from "../../store/action/authActions";
import { toast } from "react-toastify";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = ({
  handleClose,
  handleOpen,
  handleSignUpClick,
  handleLoginSuccess,
}) => {
  const refLogin = useRef(null);
  const dispatch = useDispatch();

  const [isResetOpen, setIsResetOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleLogin = async (values) => {
    const { email, password } = values;
    if (signWithPhone) {
      // If signing in with phone number
      if (!selectedCountry && !phoneNumber) {
        console.log(selectedCountry);
        setResponseMessage(
          "Please select a Country Code and Enter Correct Number"
        );
        return;
      }

      setIsLoading(true);
      try {
        // Use your verifyLogin API for phone number
        const responseData = await login(selectedCountry.value,phoneNumber);
        // console.log(responseData);

        const response = await verifyOTPLogin(
          selectedCountry.value,
          phoneNumber
        );
        console.log(response);
        const refreshToken = localStorage.getItem("RefreshToken");
        const getUserData = await getUserDetails(refreshToken);
        setIsLoggedIn(true);
        handleLoginSuccess();
        dispatch(updateProfile(getUserData.data.data.userData));
        toast.success("Logged In Successfully", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      } catch (error) {
        console.error("Error Logging In", error.message);
        setResponseMessage(
          error.message || "Error Logging In. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      // If signing in with email
      if (!email || !password) {
        setResponseMessage("Please enter email and password.");
        return;
      }

      setIsLoading(true);
      try {
        // Use your login API for email and password
        const response = await login(email, password);
        const refreshToken = localStorage.getItem("RefreshToken");
        const getUserData = await getUserDetails(refreshToken);
        setIsLoggedIn(true);
        handleLoginSuccess();
        dispatch(setEmail(email));
        dispatch(loginSuccess(response.userId));
        dispatch(updateProfile(getUserData.data.data.userData));
        toast.success("Logged In Successfully", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      } catch (error) {
        console.error("Error Logging In", error.message);
        setResponseMessage(
          error.message || "Error Logging In. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (refLogin.current && !refLogin.current.contains(event.target)) {
      handleClose();
    }
  };

  const handleLoginWithPhone = () => setSignWithPhone(true);
  const handleLoginWithEmail = () => setSignWithPhone(false);

  useEffect(() => {
    if (handleOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleOpen]);

  // const maskOtpId = (otpId) => {
  //   if (!otpId) return "";
  //   const visiblePart = otpId.substring(otpId.length - 3);
  //   const hiddenPart = "*".repeat(otpId.length - 3);
  //   return hiddenPart + visiblePart;
  // };

  const handleRefreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("RefreshToken");
      const { accessToken } = await refreshAccessToken(refreshToken);
      localStorage.setItem("AccessToken", accessToken);
    } catch (error) {
      console.log("Error Refreshing Token", error.message);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      handleRefreshToken();
    }
  }, [isLoggedIn]);

  return (
    <>
      {!isResetOpen && !isLoggedIn && (
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
                {!signWithPhone ? (
                  <div className="Phone" onClick={handleLoginWithPhone}>
                    <div className="PhoneIcon">
                      <FaPhoneVolume size={24} />
                    </div>
                    <span className="PhoneText">Continue With Phone</span>
                  </div>
                ) : (
                  <div className="Phone" onClick={handleLoginWithEmail}>
                    <div className="PhoneIcon">
                      <MdEmail size={24} />
                    </div>
                    <span className="PhoneText">Continue With Email</span>
                  </div>
                )}
              </div>
              <div className="Horizontal">
                <hr className="HorizontalLine" />
                <span>or</span>
                <hr className="HorizontalLine" />
              </div>
              {signWithPhone ? (
                // <Formik
                //   initialValues={{ selectedCountry: null, phoneNumber: "" }}
                //   validate={(values) => {
                //     const errors = {};
                //     if (!values.selectedCountry) {
                //       errors.selectedCountry = "Please select a country code.";
                //     }
                //     if (!values.phoneNumber) {
                //       errors.phoneNumber = "Please enter your phone number.";
                //     }
                //     return errors;
                //   }}
                //   onSubmit={(values, { setSubmitting }) => {
                //     handleLogin(values);
                //     setSubmitting(false);
                //   }}
                // >
                //   {({ isSubmitting }) => (
                <form className="Form">
                  <div className="Input">
                    <Select
                      value={selectedCountry}
                      onChange={setSelectedCountry}
                      options={countryOptions}
                      placeholder="Select Country Code"
                      className="CountryCodeFieldLogin"
                      name="selectedCountry"
                    />
                    {/* <ErrorMessage
                          name="selectedCountry"
                          component="div"
                          style={{ color: "red", marginBottom: "5px" }}
                        /> */}
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {/* <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          style={{ color: "red", marginBottom: "5px" }}
                        /> */}
                    <input
                      type="text"
                      // value={maskOtpId(otpId)}
                      placeholder="OTP ID"
                      className="PhoneNumberInput"
                      readOnly
                    />
                  </div>
                  <div className="LogButton">
                    <button
                      type="submit"
                      className="LoginButton"
                      disabled={isLoading}
                      onClick={handleLogin}
                    >
                      <span>{isLoading ? "Loading..." : "Login"}</span>
                    </button>
                    {responseMessage && (
                      <p style={{ color: "red", textAlign: "center" }}>
                        {responseMessage}
                      </p>
                    )}
                  </div>
                </form>
              ) : (
                // )}
                // </Formik>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = "Required Email";
                    }
                    if (!values.password) {
                      errors.password = "Required Password";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    handleLogin(values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="Form">
                      <div className="Input">
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{ color: "red", marginBottom: "5px" }}
                        />
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          style={{ color: "red", marginBottom: "5px" }}
                        />
                      </div>
                      <div
                        className="Forgot"
                        onClick={() => setIsResetOpen(true)}
                      >
                        Forgot password? <span>Reset it</span>
                      </div>
                      <div className="LogButton">
                        <button
                          className="LoginButton"
                          disabled={isLoading || isSubmitting}
                          type="submit"
                        >
                          <span>{isLoading ? "Loading..." : "Login"}</span>
                        </button>
                        {responseMessage && (
                          <p style={{ color: "red", textAlign: "center" }}>
                            {responseMessage}
                          </p>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
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
