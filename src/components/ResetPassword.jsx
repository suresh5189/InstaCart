import React, { useEffect, useRef } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const ResetPassword = ({ handleCloseModal, isOpenModal, handleClose }) => {
  const refReset = useRef(null);

  const handleClickOutSideModal = (event) => {
    if (refReset.current && !refReset.current.contains(event.target)) {
      handleCloseModal();
      handleClose();
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
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="LogButton">
                <button className="ResetButton">
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
