import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartManager'
import wishlistReducer from './features/wishlist/wishlistManager'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer
  }
});

export default store;
