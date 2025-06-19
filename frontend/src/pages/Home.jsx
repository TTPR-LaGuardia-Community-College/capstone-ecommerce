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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";
import ProductCard from "../components/ProductCard.jsx";

function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function loadFeatured() {
      try {
        // e.g. your backend can return latest 5
        const res = await api.get("/products?limit=5");
        setFeatured(res.data);
      } catch (err) {
        console.error("Failed to fetch featured", err);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to CampusTrade 🏫</h1>
      <p>A safe space for students to buy and sell on campus.</p>

      <h2>Featured Listings</h2>
      <div className="products-grid">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <Link to="/products">
        <button className="browse-btn">Browse All Listings</button>
      </Link>
    </div>
  );
}

export default Home;

