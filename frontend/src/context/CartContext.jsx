import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

// 1. Create the context
const CartContext = createContext();

// 2. Provider component
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // Optional: fetch initial cart count on mount
  useEffect(() => {
    api.get('/cart')
      .then(res => setCartCount(res.data.length))
      .catch(console.error);
  }, []);

  // If you ever want add/remove helpers, you could expose them here
  const refreshCart = () =>
    api.get('/cart').then(res => setCartCount(res.data.length));

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. The missing hook: useCart
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a <CartProvider>');
  }
  return context;
}
