import React, { useState } from "react";
import { verifyOTPRegister } from "../../apiServices";

const VerifyOTP = ({ email, onVerificationSuccess, otpid }) => {
  const [password, setPassword] = useState("");
  const [enteredotp, setEnteredotp] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (!password || !enteredotp) {
      setResponseMessage("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOTPRegister(
        email,
        password,
        enteredotp,
        otpid
      );
      if (response.status === "success") {
        setResponseMessage("OTP Verified Successfully");
        onVerificationSuccess();
        alert("Sign Up Successfully. Log in Now");
      } else {
        setResponseMessage("Error verifying OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error Verifying OTP", error.message);
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
          <div className="InputField">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>
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
