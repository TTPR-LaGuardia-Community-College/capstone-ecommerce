<<<<<<< HEAD
import React, { createContext, useContext, useState, useMemo } from 'react';
=======
// src/context/CartContext.jsx
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,     // ← make sure to import useContext
  useMemo
} from "react";
import api from "../api.js";
import { useAuth } from "./AuthContext.jsx";
>>>>>>> 91490b1a7a46b94bc266ad91512ee02371cf6cb8

export const CartContext = createContext({
  items: [],
  loading: false,
  error: null,
  addToCart: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  cartCount: 0,
  totalPrice: 0,
});

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

<<<<<<< HEAD
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const likeProduct = (product) => {
    if (!likedItems.find((item) => item.id === product.id)) {
      setLikedItems((prev) => [...prev, product]);
=======
  const fetchCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
>>>>>>> 91490b1a7a46b94bc266ad91512ee02371cf6cb8
    }
    setLoading(true);
    try {
      const { data } = await api.get("/cart");
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

<<<<<<< HEAD
  const increment = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max((item.qty || 1) - 1, 1) }
          : item
      )
    );
  };
=======
  const addToCart = useCallback(async (productId) => {
    setLoading(true);
    try {
      const { data } = await api.post("/cart", { productId });
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    setLoading(true);
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, []);
>>>>>>> 91490b1a7a46b94bc266ad91512ee02371cf6cb8

  const clearCart = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all(items.map((i) => api.delete(`/cart/${i.productId}`)));
      setItems([]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [items]);

  const cartCount = useMemo(() => items.length, [items]);
  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + parseFloat(i.Listing.price || 0), 0),
    [items]
  );

  const contextValue = useMemo(() => ({
    cart: cartItems,
    likedItems,
    addToCart,
    likeProduct,
    unlikeProduct,
    increment,
    decrement,
    remove,
  }), [
    cartItems,
    likedItems
  ]);

  return (
<<<<<<< HEAD
    <CartContext.Provider value={contextValue}>
=======
    <CartContext.Provider
      value={{
        items,
        loading,
        error,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        totalPrice,
      }}
    >
>>>>>>> 91490b1a7a46b94bc266ad91512ee02371cf6cb8
      {children}
    </CartContext.Provider>
  );
}

// now this will work, since useContext is imported above
export function useCart() {
  return useContext(CartContext);
}
