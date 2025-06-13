// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    api.get("/listings")
      .then(res => setListings(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>All Listings</h1>
      <ul>
        {listings.map(l => (
          <li key={l.id}>
            <Link to={`/listings/${l.id}`}>{l.title}</Link> — ${l.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
