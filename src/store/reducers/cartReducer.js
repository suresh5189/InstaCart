// reducers/cartReducer.js

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
} from "../ActionTypes";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // Set null as the initial quantity value if it's not provided
        const quantity = newItem.quantity ?? null;
        return {
          ...state,
          items: [...state.items, { ...newItem, quantity }],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case UPDATE_CART_ITEM_QUANTITY:
      const { itemId, quantity } = action.payload;
      // Logic to update cart item quantity
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
