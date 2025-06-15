<<<<<<< HEAD
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
=======
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to CampusTrade 🏫</h1>
      <p>A safe space for students to buy and sell on campus</p>
      <Link to="/products">
        <button className="browse-btn">Browse Listings</button>
      </Link>

      <div className="features">
        <Link to="/products" className="feature-link">
          <div className="feature-card">
            <h3>👜 <strong>Products</strong></h3>
            <p>Browse listings of student products.</p>
          </div>
        </Link>

        <Link to="/cart" className="feature-link">
          <div className="feature-card">
            <h3>🛒 <strong>Cart</strong></h3>
            <p>View items you've added to your cart.</p>
          </div>
        </Link>

        <Link to="/admin" className="feature-link">
          <div className="feature-card">
            <h3>👤 <strong>Admin</strong></h3>
            <p>Manage the marketplace postings.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
>>>>>>> main
