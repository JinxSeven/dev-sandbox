import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import TopNavigation from "./components/TopNavigation";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { useSelector } from 'react-redux';

function App() {
  const cartCount = useSelector(state => state.cart.cartItems.length);
  
  return (
    <>
    <Router>
      <TopNavigation cartCount={cartCount}></TopNavigation>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/products" element={<Products/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
