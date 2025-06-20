// import React from 'react';
// import { Link } from 'react-router-dom';
// import api from "../api.js";
// import './home.css';

// const Home = () => {
//   return (
//     <div className="home-container">
//       <h1>Welcome to CampusTrade 🏫</h1>
//       <p>A safe space for students to buy and sell on campus</p>
//       <Link to="/products">
//         <button className="browse-btn">Browse Listings</button>
//       </Link>

//       <div className="features">
//         <Link to="/products" className="feature-link">
//           <div className="feature-card">
//             <h3>👜 <strong>Products</strong></h3>
//             <p>Browse listings of student products.</p>
//           </div>
//         </Link>

//         <Link to="/cart" className="feature-link">
//           <div className="feature-card">
//             <h3>🛒 <strong>Cart</strong></h3>
//             <p>View items you've added to your cart.</p>
//           </div>
//         </Link>

//         <Link to="/admin" className="feature-link">
//           <div className="feature-card">
//             <h3>👤 <strong>Admin</strong></h3>
//             <p>Manage the marketplace postings.</p>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;


// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";
import ProductCard from "../components/ProductCard.jsx";
import "./Home.css";

export default function Home() {
  const [featured, setFeatured] = useState([]);  
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");

      try {
        // If your backend supports ?limit=5, great — use it:
        const res = await api.get("/listings?limit=5");
        // Otherwise it may return { data: [...], meta: {...} }
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
            ? res.data.data
            : [];

        setFeatured(list);
      } catch (err) {
        console.error("Failed to fetch featured", err);
        setError("Failed to load featured listings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading featured…</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="home-container">
      <h1>Welcome to CampusTrade 🏫</h1>
      <p>A safe space for students to buy and sell on campus.</p>

      <h2>Featured Listings</h2>
      {featured.length === 0 ? (
        <p>No featured listings available.</p>
      ) : (
        <div className="products-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <Link to="/products">
        <button className="browse-btn">Browse All Listings</button>
      </Link>
    </div>
  );
}


