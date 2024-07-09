import React, { useEffect, useState } from "react";
import { getUserDetails, resendOTP, verifyOTPLogin } from "../../apiServices";
import { updateProfile } from "../../store/action/userActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";

const VerifyOTP = ({
  phoneno,
  country_code,
  onVerificationSuccess,
  otpid,
  handleLoginSuccess,
}) => {
  const [enteredotp, setEnteredotp] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingResend, setIsLoadingResend] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(null);
  const [resendTimeLeft, setResendTimeLeft] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // Clear timer when component unmounts or OTP is successfully verified
    return () => {
      clearTimeout(resendTimeout);
    };
  }, [resendTimeout]);

  const handleVerifyOTP = async () => {
    if (!otpid || !phoneno || !country_code || !enteredotp) {
      setResponseMessage("Please fill all OTP fields.");
      return;
    }

    setIsLoading(true);
    try {
      // Use your verifyOTPLogin API for phone number
      await verifyOTPLogin(country_code, phoneno, otpid, enteredotp);

      // console.log(response);

      const refreshToken = localStorage.getItem("RefreshToken");
      const getUserData = await getUserDetails(refreshToken);
      handleLoginSuccess();
      onVerificationSuccess();
      dispatch(updateProfile(getUserData.data.data.userData));
      toast.success("Logged In Successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Error Verifying OTP", error.message);
      setResponseMessage(
        error.message || "Error Verifying OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoadingResend(true);
    try {
      await resendOTP(otpid);
      // console.log("Resent OTP Successfully", response);
      setResponseMessage("Resent OTP Successfully");
      startResendTimer();
    } catch (error) {
      console.log("Error Resending OTP", error.message);
      setResponseMessage(
        error.message || "Error Resending OTP. Please Try Again."
      );
    } finally {
      setIsLoadingResend(false);
    }
  };

  const startResendTimer = () => {
    setResendTimeLeft(60);
    const timer = setInterval(() => {
      setResendTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer); // Stop the timer when time reaches 0
        }
        return prevTime - 1;
      });
    }, 1000);

    setResendTimeout(timer);
  };

  return (
    <>
      <div className="Overlay"></div>
      <div className="VerifyOTP">
        <div className="CloseIcon">
          <IoMdArrowBack size={20} />
        </div>
        <h1 className="VerifyHeading">Verify Login OTP</h1>
        <div className="VerifyInput">
          <div className="InputField">
            <span>One Time Password (OTP):</span>
            <input
              type="text"
              value={enteredotp}
              onChange={(e) => setEnteredotp(e.target.value)}
              placeholder="Enter OTP"
              className="VerifyingInput"
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
        <div className="VerifyOTPResend">
          <button
            disabled={isLoadingResend || resendTimeLeft > 0}
            onClick={handleResendOtp}
          >
            {isLoadingResend
              ? "Resending"
              : resendTimeLeft > 0
              ? `Resend OTP in ${resendTimeLeft} second`
              : "Resend OTP"}
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
