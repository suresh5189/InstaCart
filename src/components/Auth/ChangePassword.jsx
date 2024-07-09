import React, { useEffect, useRef, useState } from "react";
import { changePassword } from "../../apiServices";
import { useDispatch } from "react-redux";
import { setPassword as setPasswordAction } from "../../store/action/userActions";
import { toast } from "react-toastify";

function ChangePassword({ closeModal }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const useChangeRef = useRef(null);

  const handleClickOutSide = (event) => {
    if (useChangeRef.current && !useChangeRef.current.contains(event.target)) {
      closeModal();
      setError("");
      setSuccessMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("AccessToken");
      //   console.log(accessToken);
      if (!accessToken) {
        throw new Error("Access Token Not Found!");
      }
      const message = await changePassword(
        accessToken,
        newPassword,
        confirmNewPassword
      );
      setSuccessMessage(message);
      dispatch(setPasswordAction(newPassword));
      toast.success("Password Changed Successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
      closeModal();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <>
      <div className="Overlay"></div>
      <div className="ChangePassword" ref={useChangeRef}>
        <h1>Change Password</h1>
        <form className="ChangePasswordForm" onSubmit={handleSubmit}>
          <div className="ChangePasswordInputAndLabel">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="ChangePasswordInput"
            />
          </div>
          <div className="ChangePasswordInputAndLabel">
            <label>Confirm New Password:</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {successMessage && (
              <div style={{ color: "green" }}>{successMessage}</div>
            )}
          </div>
          <div className="ChangePasswordButton">
            <button type="submit">Change Password</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
