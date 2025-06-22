// import React, { createContext, useContext, useState, useEffect } from 'react';
// import api from '../api';

// // 1. Create the context
// const CartContext = createContext();

// // 2. Provider component
// export function CartProvider({ children }) {
//   const [cartCount, setCartCount] = useState(0);

//   // Optional: fetch initial cart count on mount
//   useEffect(() => {
//     api.get('/cart')
//       .then(res => setCartCount(res.data.length))
//       .catch(console.error);
//   }, []);

//   // If you ever want add/remove helpers, you could expose them here
//   const refreshCart = () =>
//     api.get('/cart').then(res => setCartCount(res.data.length));

//   return (
//     <CartContext.Provider value={{ cartCount, refreshCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// // 3. The missing hook: useCart
// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a <CartProvider>');
//   }
//   return context;
// }

import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const increment = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0)
    );
  };

  const remove = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increment, decrement, remove }}>
      {children}
    </CartContext.Provider>
  );
};