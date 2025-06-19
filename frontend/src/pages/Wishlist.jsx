import React, { useState, useEffect } from "react";
import api from "../api.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Wishlist.css";

export default function Wishlist() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/wishlist");
        setItems(res.data);
      } catch {
        setError("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onRemove = async (id) => {
    try {
      await api.delete(`/wishlist/${id}`);
      setItems((prev) => prev.filter((i) => i.listingId !== id));
      toast.info("Removed from wishlist");
    } catch {
      toast.error("Failed to remove");
    }
  };

  if (loading) return <p>Loading wishlist…</p>;
  if (error)   return <p className="error">{error}</p>;
  if (!items.length) return <p>Your wishlist is empty.</p>;

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>
      <ul className="wishlist-list">
        {items.map((i) => (
          <li key={i.listingId}>
            <Link to={`/products/${i.listingId}`}>
              {i.listing.title}
            </Link>
            <span>${parseFloat(i.listing.price).toFixed(2)}</span>
            <button onClick={() => onRemove(i.listingId)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
