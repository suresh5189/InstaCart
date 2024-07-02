import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../ActionTypes";

const initialState = {
  isAuthenticated: false,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // localStorage.setItem("UserId", action.payload.userId);
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.userId,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
