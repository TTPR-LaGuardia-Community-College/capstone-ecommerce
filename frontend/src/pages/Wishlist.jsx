import React, { useState, useEffect } from "react";

function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/wishlist`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setItems(await res.json());
      } catch (err) {
        console.error(err);
      }
    }
    fetchWishlist();
  }, []);

  async function handleRemove(listingId) {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/wishlist/${listingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setItems(items.filter((i) => i.listingId !== listingId));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Your Wishlist</h1>
      {items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <ul>
          {items.map((i) => (
            <li key={i.listingId}>
              {i.listing.title} — ${i.listing.price}{" "}
              <button onClick={() => handleRemove(i.listingId)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Wishlist;
