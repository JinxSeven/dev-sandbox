import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wishlistedItems: []
}

const wishlistManager = createSlice({
  name: "wishlistManager",
  initialState,
  reducers: {
    toggleWishlistItem(state, action) {
      const item = action.payload;
      const index = state.wishlistedItems.findIndex(
        prod => prod.id === item.id
      );
      
      if (index >= 0) {
        state.wishlistedItems.splice(index, 1);
      } else {
        state.wishlistedItems.push(item);
      }
      const matchingItem = state.wishlistedItems.find(prod => prod.id === item.id);

      if (matchingItem) {
        return {
          ...state,
          wishlistedItems: state.wishlistedItems.map(prod => {
            if (prod.id !== matchingItem.id) return prod
          })
        }
      }

      else return {
        ...state,
        wishlistedItems: [...state.wishlistedItems, item]
      }
    }
  }
});

export const { toggleWishlistItem } = wishlistManager.actions

export default wishlistManager.reducer