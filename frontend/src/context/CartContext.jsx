import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

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
    }
  };

  const unlikeProduct = (productId) => {
    setLikedItems((prev) => prev.filter((item) => item.id !== productId));
  };

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

  const remove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

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
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
