import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {thunk} from "redux-thunk"; // Import redux-thunk

import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  auth:authReducer,
  user: userReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Ensure redux-thunk is applied correctly using getDefaultMiddleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
