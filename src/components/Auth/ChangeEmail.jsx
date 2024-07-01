import React, { useEffect, useRef, useState } from "react";
import { changeEmail } from "../../apiServices";
import { setEmail as setEmailAction } from "../../store/action/userActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function ChangeEmail({ closeEmailModal }) {
  const [emailValue, setEmailValue] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const useEmailRef = useRef(null);

  const handleClickOutSide = (event) => {
    if (useEmailRef.current && !useEmailRef.current.contains(event.target)) {
      closeEmailModal();
    }
  };

  const handleEmail = async () => {
    try {
      const accessToken = localStorage.getItem("AccessToken");
      if (!accessToken) {
        console.log("Acess Token Not Found!");
      }
      const message = await changeEmail(
        emailValue,
        confirmEmail,
        password,
        accessToken
      );
      dispatch(setEmailAction(emailValue));
      setMessage(message || "Email SuccessFully Changed");
      toast.success("Email Changed Successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
      closeEmailModal();
    } catch (error) {
      setMessage(
        error.message || "Error Changing Email. Please Try Again Later."
      );
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
      <div className="ChangeEmail" ref={useEmailRef}>
        <h1>Change Email</h1>
        <input
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="New Email"
          className="ChangeEmailInput"
        />
        <input
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          placeholder="Confirm Email"
          className="ChangeEmailInput"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="ChangeEmailInput"
        />
        {message && <p style={{ color: "red" }}>{message}</p>}
        <div className="ChangeEmailButton">
          <button onClick={handleEmail}>Change Email</button>
        </div>
      </div>
    </>
  );
}

export default ChangeEmail;
