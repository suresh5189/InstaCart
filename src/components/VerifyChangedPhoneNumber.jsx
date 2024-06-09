import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { changePhoneNumber, verifyChangedPhoneNumber } from "../apiServices";

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
    console.log("First");
    try {
      const accessToken = localStorage.getItem("AccessToken");
      if (!accessToken) {
        console.log("Access Token Not Found!");
      }
      console.log(accessToken);
      const response = await changePhoneNumber(
        selectedCountry.value,
        phoneNumber,
        accessToken
      );
      console.log(response);
      setOtpSent(true);
      setMessage(response.message || "OTP Sent Successfully");
    } catch (error) {
      setMessage(error.message || "Error Sending OTP");
    }
  };

  const handleVerifyPhoneNumber = async () => {
    try {
      const response = await verifyChangedPhoneNumber(
        selectedCountry.value,
        phoneNumber,
        otpId,
        enteredOtp
      );
      setMessage(response.message || "Phone Number Verified Successfully");
      closePhoneModal();
    } catch (error) {
      setMessage(error.message || "Error Verifying Phone Number");
    }
  };

  return (
    <>
      <div className="Overlay"></div>
      <div className="VerifyChangedPhoneNumber" ref={usePhoneRef}>
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
        {otpSent ? (
          <>
            <input
              type="text"
              value={otpId}
              onChange={(e) => setOtpId(e.target.value)}
              placeholder="OTP ID"
              className="PhoneNumberInput"
            />
            <input
              type="text"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              placeholder="Entered OTP"
              className="PhoneNumberInput"
            />
          </>
        ) : null}
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
