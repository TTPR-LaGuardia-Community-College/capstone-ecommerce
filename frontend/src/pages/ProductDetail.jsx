import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/listings/${id}`
        );
        setListing(await res.json());
      } catch (err) {
        console.error(err);
      }
    }
    fetchListing();
  }, [id]);

  async function handleAddWishlist() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ listingId: id }),
      });
      if (res.ok) alert("Added to wishlist");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSendMessage() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          receiverId: listing.owner.id,
          content: message,
        }),
      });
      if (res.ok) alert("Message sent");
    } catch (err) {
      console.error(err);
    }
  }

  if (!listing) return <p>Loading…</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{listing.title}</h2>
      <p>{listing.description}</p>
      <p>
        <strong>Price:</strong> ${listing.price}
      </p>
      <button onClick={handleAddWishlist}>Add to Wishlist</button>
      <hr />
      <h3>Message Seller ({listing.owner.username})</h3>
      <textarea
        rows="4"
        cols="50"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ListingDetail;
