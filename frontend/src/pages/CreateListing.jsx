
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [preview, setPreview] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const loggedInAdmin = JSON.parse(localStorage.getItem('loggedInAdmin'));
    if (loggedInAdmin && loggedInAdmin.email) {
      setIsAuthorized(true);
    } else {
      alert('Only admins can access this page.');
      navigate('/admin');
    }
  }, [navigate]);

  if (!isAuthorized) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imageFile' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, imageUrl: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else if (name === 'imageUrl') {
      setForm({ ...form, imageUrl: value });
      setPreview(value);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedListings = JSON.parse(localStorage.getItem('productListings')) || [];
    const newListing = { ...form, id: Date.now() };
    const updatedListings = [...storedListings, newListing];
    localStorage.setItem('productListings', JSON.stringify(updatedListings));
    alert('Product listing posted!');
    setForm({ name: '', description: '', price: '', imageUrl: '' });
    setPreview('');
  };

  return (
    <div style={container}>
      <h2 style={heading}>📝 Create Product Listing</h2>
      <form onSubmit={handleSubmit}>
        <label style={label}>Product Name:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required style={input} />

        <label style={label}>Description:</label>
        <textarea name="description" value={form.description} onChange={handleChange} required style={textarea} />

        <label style={label}>Price ($):</label>
        <input type="number" name="price" value={form.price} onChange={handleChange} required style={input} />

        <label style={label}>Image URL:</label>
        <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} style={input} />

        <div style={{ textAlign: 'center', margin: '1rem 0' }}>— OR —</div>

        <label style={label}>Upload Image:</label>
        <input type="file" name="imageFile" accept="image/*" onChange={handleChange} style={input} />

        {preview && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }} />
          </div>
        )}

        <button type="submit" style={button}>Post Listing</button>
      </form>
    </div>
  );
};

const container = {
  maxWidth: '500px',
  margin: '3rem auto',
  padding: '2rem',
  border: '1px solid #eee',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.05)',
  background: '#fff',
  fontFamily: 'Segoe UI, sans-serif'
};

const heading = {
  marginBottom: '1.5rem',
  textAlign: 'center',
  color: '#333'
};

const label = {
  display: 'block',
  marginBottom: '0.5rem',
  marginTop: '1rem',
  fontWeight: '600'
};

const input = {
  width: '100%',
  padding: '0.6rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

const textarea = {
  ...input,
  height: '100px',
  resize: 'vertical'
};

const button = {
  width: '100%',
  padding: '0.8rem',
  backgroundColor: '#2e8b57',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  marginTop: '1.5rem',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer'
};

export default CreateListing;
 