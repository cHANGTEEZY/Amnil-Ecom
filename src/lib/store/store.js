import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
});

export default store;
