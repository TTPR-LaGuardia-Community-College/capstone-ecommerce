import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from "react";
import api from "../api.js";
import { useAuth } from "./AuthContext.jsx";

export const WishlistContext = createContext({
  items: [],
  loading: false,
  error: null,
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  clearWishlist: async () => {},
  wishlistCount: 0,
});

export function WishlistProvider({ children }) {
  const { user } =  useAuth();
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // 1) Fetch wishlist when user logs in or changes
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

  // 2) Add an item
  const addToWishlist = useCallback(
    async (listingId) => {
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
    },
    []
  );

  // 3) Remove an item
  const removeFromWishlist = useCallback(
    async (listingId) => {
      setLoading(true);
      try {
        await api.delete(`/wishlist/${listingId}`);
        setItems((prev) => prev.filter((i) => i.listingId !== listingId));
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 4) Clear all (bulk remove)
  const clearWishlist = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all(
        items.map((i) => api.delete(`/wishlist/${i.listingId}`))
      );
      setItems([]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [items]);

  // 5) Computed count
  const wishlistCount = useMemo(() => items.length, [items]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
