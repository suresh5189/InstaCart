// reducers/cartReducer.js

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
} from "../ActionTypes";

const initialState = {
  items: [],
  totalItems: 0,
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
        const quantity = newItem.quantity ?? 1;
        return {
          ...state,
          items: [...state.items, { ...newItem, quantity }],
          totalItems: state.totalItems + 1,
        };
      }
    case REMOVE_FROM_CART:
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (!itemToRemove) {
        // If item is not found in cart, return current state
        return state;
      }

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        totalItems: Math.max(state.totalItems - 1, 0), // Ensure totalItems is never negative
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
