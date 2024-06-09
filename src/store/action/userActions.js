// Import action types
import {
  SET_EMAIL,
  SET_PASSWORD,
  LOGIN_USER,
  LOGOUT_USER,
  FIRST_NAME,
  LAST_NAME,
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

export const loginUser = () => ({
  type: LOGIN_USER,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
