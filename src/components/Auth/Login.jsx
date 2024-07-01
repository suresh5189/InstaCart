import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaPhoneVolume } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import ResetPassword from "./ResetPassword";
import { getUserDetails, login, refreshAccessToken } from "../../apiServices";
import { useDispatch } from "react-redux";
import { setEmail, updateProfile } from "../../store/action/userActions";
import { loginSuccess } from "../../store/action/authActions";
import { toast } from "react-toastify";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import VerifyLoginOTP from "../Auth/VerifyLoginOTP";

const Login = ({ handleClose, handleSignUpClick, handleLoginSuccess }) => {
  const dispatch = useDispatch();

  const [isResetOpen, setIsResetOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signWithPhone, setSignWithPhone] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isOtpid, setIsOtpid] = useState(null);

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
        const responseData = await login(selectedCountry.value, phoneNumber);
        const otpid = responseData.data.data.otpid;
        setIsOtpid(otpid);

        setShowOTPModal(true);
      } catch (error) {
        console.error("Error Logging In From Phone Number", error.message);
        setResponseMessage(
          error.message ||
            "Error Logging In From Phone Number. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      const { email, password } = values;
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
        console.error("Error Logging In From Email", error.message);
        setResponseMessage(
          error.message || "Error Logging In From Email. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (event.target.classList.contains("Overlay") || !showOTPModal) {
      handleClose();
    }
  };

  const handleLoginWithPhone = () => setSignWithPhone(true);
  const handleLoginWithEmail = () => setSignWithPhone(false);

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
          <div className="Overlay" onClick={handleClickOutside}></div>
          <div className="LoginDiv">
          <div className="Login">
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
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      style={{ margin: "10px 0", width: "100%" }}
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
                          style={{ marginBottom: "10px", width: "100%" }}
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
                          style={{ marginBottom: "10px", width: "100%" }}
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
      </div>
        </>
      )}
      {showOTPModal && (
        <VerifyLoginOTP
        phoneno={phoneNumber}
        country_code={selectedCountry.value}
        otpid={isOtpid}
        handleLoginSuccess={handleLoginSuccess}
        onVerificationSuccess={handleClose}
        />
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
