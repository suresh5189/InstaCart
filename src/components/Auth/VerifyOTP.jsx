import React, { useState } from "react";
import { verifyOTPRegister } from "../../apiServices";

const VerifyOTP = ({
  email,
  phoneno,
  country_code,
  onVerificationSuccess,
  otpid,
  isPhoneSignUp, // New prop to determine if sign-up was with phone
}) => {
  const [password, setPassword] = useState("");
  const [enteredotp, setEnteredotp] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (email) {
      if (!password || !enteredotp) {
        setResponseMessage("Please fill all fields.");
        return;
      }
    }

    setIsLoading(true);
    try {
      let response;
      if (isPhoneSignUp) {
        // Sign up was with phone number
        console.log(response);
        response = await verifyOTPRegister(
          null, // No email needed for phone sign-up
          country_code,
          phoneno,
          null,
          enteredotp,
          otpid
        );
      } else {
        response = await verifyOTPRegister(
        // Sign up was with email
          email,
          null, // No country_code or phoneno needed for email sign-up
          null,
          password,
          enteredotp,
          otpid
        );
      }

      if (response && response.status === "success") {
        setResponseMessage("OTP Verified Successfully");
        onVerificationSuccess();
        alert("Sign Up Successfully. Log in Now");
      } else {
        setResponseMessage("Error verifying OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error Verifying OTP", error);
      setResponseMessage("Error verifying OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="Overlay"></div>
      <div className="VerifyOTP">
        <h1>Verify OTP</h1>
        <div className="Input">
          {email && (
            <div className="InputField">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </div>
          )}
          <div className="InputField">
            <label>OTP:</label>
            <input
              type="text"
              value={enteredotp}
              onChange={(e) => setEnteredotp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>
        </div>
        <div className="VerifyButton">
          <button onClick={handleVerifyOTP} disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
        {responseMessage && (
          <p style={{ color: "red", textAlign: "center" }}>{responseMessage}</p>
        )}
      </div>
    </>
  );
};

export default VerifyOTP;
