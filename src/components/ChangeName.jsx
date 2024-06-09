import React, { useEffect, useRef, useState } from "react";
import { changeName } from "../apiServices";
import { useDispatch } from "react-redux";
import {
  setFirstName as setFirstNameChange,
  setLastName as setLastNameChange,
} from "../store/action/userActions"; // Import action creators

function ChangeName({ closeNameModal }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const useNameRef = useRef(null);

  const handleClickOutside = (event) => {
    if (useNameRef.current && !useNameRef.current.contains(event.target)) {
      closeNameModal();
    }
  };

  const handleNameChange = async () => {
    try {
      const accessToken = localStorage.getItem("AccessToken");
      if (!accessToken) {
        console.log("Access Token Not Found!");
        return;
      }
      const message = await changeName(firstName, lastName, accessToken);
      dispatch(setFirstNameChange(firstName));
      dispatch(setLastNameChange(lastName));
      setMessage(message || "Name Successfully Changed");
      closeNameModal();
    } catch (error) {
      setMessage(
        error.message || "Error Changing Name. Please Try Again Later."
      );
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="Overlay"></div>
      <div className="ChangeName" ref={useNameRef}>
        <h1>Change Name</h1>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="ChangeNameInput"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="ChangeNameInput"
        />
        {message && <p style={{ color: "red" }}>{message}</p>}
        <div className="ChangeNameButton">
          <button onClick={handleNameChange}>Change Name</button>
        </div>
      </div>
    </>
  );
}

export default ChangeName;
