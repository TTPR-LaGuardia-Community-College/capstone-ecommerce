// src/admin/AdminListings.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const allListings = JSON.parse(localStorage.getItem('products')) || [];
    setListings(allListings);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    const updated = listings.filter(item => item.id !== id);
    localStorage.setItem('products', JSON.stringify(updated));
    setListings(updated);
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <div style={container}>
      <h2 style={heading}>🛠️ Admin Product Listings</h2>
      {listings.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={grid}>
          {listings.map((item) => (
            <div key={item.id} style={card}>
              <img src={item.imageUrl} alt={item.name} style={img} />
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <div style={buttonRow}>
                <button style={editBtn} onClick={() => handleEdit(item.id)}>Edit</button>
                <button style={delBtn} onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const container = {
  maxWidth: '1000px',
  margin: '3rem auto',
  padding: '2rem',
  fontFamily: 'Segoe UI, sans-serif'
};

const heading = {
  fontSize: '1.8rem',
  marginBottom: '1rem'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1rem'
};

const card = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '1rem',
  textAlign: 'center',
  background: '#fff'
};

const img = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  marginBottom: '0.5rem'
};

const buttonRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '1rem'
};

const editBtn = {
  backgroundColor: '#2e8b57',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  cursor: 'pointer'
};

const delBtn = {
  backgroundColor: '#b22222',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default AdminListings;
