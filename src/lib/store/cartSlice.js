import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, price, quantity } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.push({ id, price, quantity });
      }
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.cart || [];
export const selectTotalItems = (state) =>
  selectCartItems(state).reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state) =>
  selectCartItems(state).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
