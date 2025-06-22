// // src/admin/AdminListings.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminListings = () => {
//   const navigate = useNavigate();
//   const [listings, setListings] = useState([]);

//   useEffect(() => {
//     const allListings = JSON.parse(localStorage.getItem('products')) || [];
//     setListings(allListings);
//   }, []);

//   const handleDelete = (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this product?");
//     if (!confirm) return;

//     const updated = listings.filter(item => item.id !== id);
//     localStorage.setItem('products', JSON.stringify(updated));
//     setListings(updated);
//   };

//   const handleEdit = (id) => {
//     navigate(`/admin/edit/${id}`);
//   };

//   return (
//     <div style={container}>
//       <h2 style={heading}>🛠️ Admin Product Listings</h2>
//       {listings.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div style={grid}>
//           {listings.map((item) => (
//             <div key={item.id} style={card}>
//               <img src={item.imageUrl} alt={item.name} style={img} />
//               <h3>{item.name}</h3>
//               <p>${item.price}</p>
//               <div style={buttonRow}>
//                 <button style={editBtn} onClick={() => handleEdit(item.id)}>Edit</button>
//                 <button style={delBtn} onClick={() => handleDelete(item.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const container = {
//   maxWidth: '1000px',
//   margin: '3rem auto',
//   padding: '2rem',
//   fontFamily: 'Segoe UI, sans-serif'
// };

// const heading = {
//   fontSize: '1.8rem',
//   marginBottom: '1rem'
// };

// const grid = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//   gap: '1rem'
// };

// const card = {
//   border: '1px solid #ddd',
//   borderRadius: '10px',
//   padding: '1rem',
//   textAlign: 'center',
//   background: '#fff'
// };

// const img = {
//   width: '100%',
//   height: '150px',
//   objectFit: 'cover',
//   marginBottom: '0.5rem'
// };

// const buttonRow = {
//   display: 'flex',
//   justifyContent: 'space-between',
//   marginTop: '1rem'
// };

// const editBtn = {
//   backgroundColor: '#2e8b57',
//   color: 'white',
//   border: 'none',
//   padding: '0.5rem 1rem',
//   borderRadius: '5px',
//   cursor: 'pointer'
// };

// const delBtn = {
//   backgroundColor: '#b22222',
//   color: 'white',
//   border: 'none',
//   padding: '0.5rem 1rem',
//   borderRadius: '5px',
//   cursor: 'pointer'
// };

// export default AdminListings;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";
import { toast } from "react-toastify";
import "./AdminListings.css";

export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // pagination & filters state
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // whenever page/search/category changes, refetch
  useEffect(() => {
    fetchListings();
  }, [page, search, category]);

  async function fetchListings() {
    setLoading(true);
    setError("");

    try {
      const params = { page, limit };
      if (search)   params.search   = search;
      if (category) params.category = category;

      const res = await api.get("/admin/listings", { params });
      setListings(res.data.data);
      setTotalPages(res.data.meta.totalPages);
      setCategories(res.data.meta.categories);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(id) {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await api.delete(`/admin/listings/${id}`);
      toast.success("Listing deleted");
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete");
    }
  }

  return (
    <div className="admin-listings">
      <h1>All Listings</h1>

      {/* --- Filters ---*/}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => { setPage(1); setSearch(e.target.value); }}
        />

        <select
          value={category}
          onChange={(e) => { setPage(1); setCategory(e.target.value); }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <Link to="/admin/listings/edit/new">
          <button>Create New</button>
        </Link>
      </div>

      {error && <p className="error">{error}</p>}

      {/* --- Listing Table or Loader ---*/}
      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="listings-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((l) => (
              <tr key={l.id}>
                <td>{l.title}</td>
                <td>${l.price}</td>
                <td>{l.category}</td>
                <td>{l.owner?.username || "—"}</td>
                <td>
                  <Link to={`/admin/listings/edit/${l.id}`}>Edit</Link>{" "}
                  <button className="danger" onClick={() => handleRemove(l.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ── Pagination Controls ───────────────────────────────────────────── */}
      <div className="pagination">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ← Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
