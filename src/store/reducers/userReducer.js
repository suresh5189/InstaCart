// Import action types
import { SET_EMAIL, SET_PASSWORD,LOGIN_USER,LOGOUT_USER } from '../ActionTypes';

// Initial state
const initialState = {
  email: '', // Initial email state
  password:'',
  isLoggedIn:false,
};

// Reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
      case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
