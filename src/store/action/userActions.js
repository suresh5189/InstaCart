// Import action types
import { SET_EMAIL, SET_PASSWORD,LOGIN_USER,LOGOUT_USER } from "../ActionTypes";

// Action creator for setting email
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


export const loginUser = () => ({
  type: LOGIN_USER,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
