import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { changePhoneNumber, verifyChangedPhoneNumber } from "../../apiServices";
import { setPhoneNumber as setPhoneNumberAction } from "../../store/action/userActions";

const countryOptions = [
  { value: "+91", label: "+91 - India" },
  { value: "+1", label: "+1 - United States" },
  { value: "+44", label: "+44 - United Kingdom" },
  { value: "+86", label: "+86 - China" },
  { value: "+81", label: "+81 - Japan" },
  { value: "+49", label: "+49 - Germany" },
  { value: "+7", label: "+7 - Russia" },
];

const VerifyChangedPhoneNumber = ({ closePhoneModal }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpId, setOtpId] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const usePhoneRef = useRef(null);

  const dispatch = useDispatch();

  const handleClickOutSide = (event) => {
    if (usePhoneRef.current && !usePhoneRef.current.contains(event.target)) {
      closePhoneModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const handleSendOTP = async () => {
    try {
      const accessToken = localStorage.getItem("AccessToken");
      if (!accessToken) {
        throw new Error("Access Token Not Found!");
      }
      const response = await changePhoneNumber(
        selectedCountry.value,
        phoneNumber,
        accessToken
      );
      const otpid = response.data.otpid;
      // console.log(otpid);
      setOtpSent(true);
      setMessage(response.message || "OTP Sent Successfully");
      setOtpId(otpid); // Set OTP ID obtained from the API response
    } catch (error) {
      setMessage(error.message || "Error Sending OTP");
    }
  };

  const handleVerifyPhoneNumber = async () => {
    try {
      const accessToken = localStorage.getItem("AccessToken");
      if (!accessToken) {
        throw new Error("Access Token Not Found");
      }
      const response = await verifyChangedPhoneNumber(
        selectedCountry.value,
        phoneNumber,
        otpId,
        enteredOtp,
        accessToken
      );
      setMessage(response.message || "Phone Number Verified Successfully");
      dispatch(setPhoneNumberAction(phoneNumber));
      closePhoneModal();
    } catch (error) {
      setMessage(error.message || "Error Verifying Phone Number");
    }
  };

  const maskOtpId = (otpId) => {
    if (!otpId) return "";
    const visiblePart = otpId.substring(otpId.length - 3);
    const hiddenPart = "*".repeat(otpId.length - 3);
    return hiddenPart + visiblePart;
  };

  return (
    <>
      <div className="Overlay"></div>
      <div className="VerifyChangedPhoneNumber" ref={usePhoneRef}>
        {!otpSent ? (
          <>
            <h1>{otpSent ? "Verify Phone Number" : "Change Phone Number"}</h1>
            <Select
              value={selectedCountry}
              onChange={setSelectedCountry}
              options={countryOptions}
              placeholder="Select Country Code"
              className="CountryCodeField"
            />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="PhoneNumberInput"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              value={maskOtpId(otpId)}
              placeholder="OTP ID"
              className="PhoneNumberInput"
              readOnly
            />
            <input
              type="text"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              placeholder="Entered OTP"
              className="PhoneNumberInput"
            />
          </>
        )}
        {message && <p style={{ color: "red" }}>{message}</p>}
        <div className="VerifyChangedPhoneNumberButton">
          {otpSent ? (
            <button onClick={handleVerifyPhoneNumber}>
              Verify Phone Number
            </button>
          ) : (
            <button onClick={handleSendOTP}>Send OTP</button>
          )}
          <button onClick={closePhoneModal}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default VerifyChangedPhoneNumber;
