import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import api from "../api.js";
import { useAuth } from "./AuthContext.jsx";

export const WishlistContext = createContext({
  items: [],
  loading: false,
  error: null,
  addToWishlist: async (listingId) => {},
  removeFromWishlist: async (listingId) => {},
  clearWishlist: async () => {},
  isWishlisted: (listingId) => false,
  wishlistCount: 0,
});

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // Fetch wishlist when user logs in / out
  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get("/wishlist");
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = useCallback(async (listingId) => {
    setLoading(true);
    try {
      const { data } = await api.post("/wishlist", { listingId });
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromWishlist = useCallback(async (listingId) => {
    setLoading(true);
    try {
      const { data } = await api.delete(`/wishlist/${listingId}`);
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearWishlist = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all(items.map(i => api.delete(`/wishlist/${i.listingId}`)));
      setItems([]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [items]);

  // Helper to check if a given listingId is already in the wishlist
  const isWishlisted = useMemo(
    () => (listingId) => items.some(i => i.listingId === listingId),
    [items]
  );

  const wishlistCount = useMemo(() => items.length, [items]);

  return (
    <WishlistContext.Provider value={{
      items,
      loading,
      error,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isWishlisted,
      wishlistCount,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

// custom hook for consuming the context
export function useWishlist() {
  return useContext(WishlistContext);
}
