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

  const fetchCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
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

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;