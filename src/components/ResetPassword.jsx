import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { resetPassword } from "../apiServices";

const ResetPassword = ({ handleCloseModal, isOpenModal, handleClose }) => {
  const refReset = useRef(null);

  const handleClickOutSideModal = (event) => {
    if (refReset.current && !refReset.current.contains(event.target)) {
      handleCloseModal();
      handleClose();
    }
  };

  const [emailValue, setEmailValue] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const message = await resetPassword(emailValue);
      console.log(message);
      setMessage(message.data.data || "Linked Sent Successfully");
    } catch (error) {
      setMessage(error.message || "Error Sending Link.Try Again Later.");
    }
  };

  useEffect(() => {
    if (isOpenModal) {
      document.addEventListener("mousedown", handleClickOutSideModal);
    } else {
      document.removeEventListener("mousedown", handleClickOutSideModal);
    }
  });

  return (
    <>
      {isOpenModal && (
        <>
          <div className="Overlay"></div>
          <div className="Reset" ref={refReset}>
            <div className="ResetInside">
              <div className="CloseIcon">
                <IoIosArrowRoundBack onClick={handleCloseModal} size={24} />
              </div>
              <h1>Forgot password?</h1>
              <div className="ResetInput">
                <div className="Email">
                  <span className="EmailInputAboveText">
                    We’ll send you a link to reset your password.
                  </span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                </div>
              {message && <p style={{ color: "red" }}>{message}</p>}
              </div>
              <div className="LogButton">
                <button className="ResetButton" onClick={handleResetPassword}>
                  <span>Reset password</span>
                </button>
              </div>
              <div className="ResetHorizontalAbove">
                <div
                  style={{
                    borderBottom: "1px solid lightGrey",
                    margin: "10px",
                  }}
                ></div>
                <div className="Account">
                  <span>Don’t have an account?</span>
                  <span className="SignButton">Sign up</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
