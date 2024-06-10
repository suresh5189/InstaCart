// Import action types
import {
  SET_EMAIL,
  SET_PASSWORD,
  FIRST_NAME,
  LAST_NAME,
  PHONE_NUMBER,
} from "../ActionTypes";

// Initial state
const initialState = {
  email: "", // Initial email state
  password: "",
  firstName: "",
  lastName: "",
  phoneno: "",
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
    case FIRST_NAME:
      return {
        ...state,
        firstName: action.payload,
      };
    case LAST_NAME:
      return {
        ...state,
        lastName: action.payload,
      };
    case PHONE_NUMBER:
      return {
        ...state,
        phoneno: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
