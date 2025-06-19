import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from "react";
import api from "../api.js";
import { AuthContext } from "./AuthContext.jsx";

export const CartContext = createContext({
  items: [],
  loading: false,
  error: null,
  addToCart: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  cartCount: 0,
  totalPrice: 0
});

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // 1) login/refresh
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

  // 2) addToCart()
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

  // 3) removeFromCart()
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

  // 4) clearCart() (bulk removal)
  const clearCart = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all(items.map((it) => api.delete(`/cart/${it.productId}`)));
      setItems([]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [items]);

  // 5) computed values
  const cartCount = useMemo(() => items.length, [items]);
  const totalPrice = useMemo(
    () => items.reduce((sum, it) => sum + parseFloat(it.Listing.price), 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        error,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
