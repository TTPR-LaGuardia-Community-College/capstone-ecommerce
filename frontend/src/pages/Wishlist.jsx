import React, { useState, useEffect } from "react";
import api from "../api.js";
import { Link } from "react-router-dom";

function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/wishlist");
        setItems(res.data);
      } catch (err) {
        console.error("Load wishlist failed", err);
      }
    }
    load();
  }, []);

  async function remove(id) {
    try {
      await api.delete(`/wishlist/${id}`);
      setItems(items.filter((i) => i.listingId !== id));
    } catch (err) {
      console.error("Remove failed", err);
    }
  }

  if (items.length === 0) return <p>No items in your wishlist.</p>;

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>
      <ul>
        {items.map((i) => (
          <li key={i.listingId}>
            <Link to={`/products/${i.listingId}`}>
              {i.listing.title}
            </Link>{" "}
            — ${i.listing.price.toFixed(2)}{" "}
            <button onClick={() => remove(i.listingId)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wishlist;
