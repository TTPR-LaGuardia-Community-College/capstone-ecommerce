import React, { createContext, useState, useEffect } from "react";
import api from "../api.js";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // load cart on mount
  useEffect(() => {
    api.get("/cart")
      .then(res => setItems(res.data))
      .catch(console.error);
  }, []);

  function addToCart(productId) {
    return api.post("/cart", { productId })
      .then(res => setItems(res.data));
  }

  function removeFromCart(productId) {
    return api.delete(`/cart/${productId}`)
      .then(res => setItems(res.data));
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
