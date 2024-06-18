import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../ActionTypes";

export const loginSuccess = (userId) => ({
  type: LOGIN_SUCCESS,
  payload: { userId },
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
