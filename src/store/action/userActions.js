// Import action types
import {
  SET_EMAIL,
  SET_PASSWORD,
  FIRST_NAME,
  LAST_NAME,
  PHONE_NUMBER,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  UPDATE_USER_PROFILE,
  UPDATE_TOTAL_PRICE,
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
  CLEAR_CART,
} from "../ActionTypes";

export const updateProfile = (userData) => ({
  type: UPDATE_USER_PROFILE,
  payload: userData,
});

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

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const updateCartItemQuantity = (itemId, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { itemId, quantity },
});

export const updateTotalPrice = (totalPrice) => ({
  type: UPDATE_TOTAL_PRICE,
  payload: totalPrice,
});

export const addToFavorite = (item) => ({
  type: ADD_TO_FAVORITE,
  payload: item,
});

export const removeFromFavorite = (item) => ({
  type: REMOVE_FROM_FAVORITE,
  payload: item.id,
});
