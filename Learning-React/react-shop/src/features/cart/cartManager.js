import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: []
}

const cartManager = createSlice({
  name: "cartManager",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const matchingItem = state.cartItems.find(prod => prod.id === item.id);

      if (matchingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(prod =>
            prod.id === item.id
              ? { ...prod, quantity: prod.quantity + 1 }
              : prod
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...item, quantity: 1 }]
        };
      }
    }
  }
});

export const { addToCart } = cartManager.actions;

export default cartManager.reducer;