// Import action types
import {
  SET_EMAIL,
  SET_PASSWORD,
  FIRST_NAME,
  LAST_NAME,
  PHONE_NUMBER,
} from "../ActionTypes";

export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
};

export const setPassword = (password) => {
  return {
    type: SET_PASSWORD,
    payload: password,
  };
};

export const setFirstName = (firstName) => {
  return {
    type: FIRST_NAME,
    payload: firstName,
  };
};

export const setLastName = (lastName) => {
  return {
    type: LAST_NAME,
    payload: lastName,
  };
};

export const setPhoneNumber = (phoneno) => {
  return {
    type: PHONE_NUMBER,
    payload: phoneno,
  };
};


