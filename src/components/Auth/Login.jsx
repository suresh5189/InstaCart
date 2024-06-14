import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import ResetPassword from "./ResetPassword";
import { login } from "../../apiServices";
import { useDispatch } from "react-redux";
import { setEmail, setPassword } from "../../store/action/userActions";
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

  const handleLogin = async (values) => {
    const { email, password } = values;
    if (!email || !password) {
      setResponseMessage("Please Enter Email And Password");
      return;
    }
    setIsLoading(true);
    try {
      const response = await login(email, password);
      setResponseMessage(response.message || "Logged In Successfully");
      // console.log(response.data);
      setIsLoggedIn(true);
      handleLoginSuccess();
      dispatch(setEmail(email));
      dispatch(setPassword(password));
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
                initialValues={{ email: "", password: "" }}
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
                      <div className="Email">
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                      <div className="Password">
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div
                      className="Forgot"
                      onClick={() => setIsResetOpen(true)}
                    >
                      Forgot password?{" "}
                      <span onClick={() => setIsResetOpen(true)}>Reset it</span>
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
