import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    cunyId: '',
    currentPassword: '',
    password: '',
    confirmPassword: '',
    profilePicture: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const storedAdmin = JSON.parse(localStorage.getItem('admin'));

    if (!loggedIn || !storedAdmin) {
      navigate('/admin');
    } else {
      setAdmin(storedAdmin);
      setForm({
        fullName: storedAdmin.fullName || '',
        email: storedAdmin.email || '',
        phone: storedAdmin.phone || '',
        cunyId: storedAdmin.cunyId || '',
        password: '',
        confirmPassword: '',
        currentPassword: '',
        profilePicture: storedAdmin.profilePicture || ''
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture' && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (form.password) {
      if (form.currentPassword !== admin.password) {
        alert('Current password is incorrect');
        return;
      }
      if (form.password !== form.confirmPassword) {
        alert('New passwords do not match');
        return;
      }
    }

    const updatedAdmin = {
      ...admin,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      cunyId: form.cunyId,
      password: form.password ? form.password : admin.password,
      profilePicture: form.profilePicture
    };

    localStorage.setItem('admin', JSON.stringify(updatedAdmin));
    setAdmin(updatedAdmin);
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin');
  };

  if (!admin) {
    return <p style={{ padding: '2rem' }}>Admin not logged in.</p>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Welcome, {admin.fullName || 'Admin'} 👋</h2>
        <button onClick={handleLogout} style={logoutBtn}>Logout</button>
      </div>

      {admin.profilePicture && (
        <img
          src={admin.profilePicture}
          alt="Profile"
          style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem' }}
        />
      )}

      {!editMode ? (
        <>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Phone:</strong> {admin.phone}</p>
          <p><strong>CUNY ID:</strong> {admin.cunyId}</p>
          <button onClick={() => setEditMode(true)} style={button}>Edit Profile</button>
        </>
      ) : (
        <>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} style={input} />

          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} style={input} />

          <label>Phone:</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} style={input} />

          <label>CUNY ID:</label>
          <input type="text" name="cunyId" value={form.cunyId} onChange={handleChange} style={input} />

          <label>Upload Profile Picture:</label>
          <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} style={input} />

          <label>Current Password:</label>
          <input type="password" name="currentPassword" value={form.currentPassword} onChange={handleChange} style={input} />

          <label>New Password:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} style={input} />

          <label>Confirm New Password:</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} style={input} />

          <button onClick={handleSave} style={button}>Save Changes</button>
          <button onClick={() => setEditMode(false)} style={{ ...button, background: 'gray' }}>Cancel</button>
        </>
      )}

      <hr style={{ margin: '2rem 0' }} />
      <h3>Your Listings</h3>
      <p>No listings posted yet.</p>
      <h3>Your Purchases</h3>
      <p>No purchases made yet.</p>
    </div>
  );
};

const input = {
  display: 'block',
  width: '100%',
  padding: '0.6rem',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '5px'
};

const button = {
  padding: '0.6rem 1rem',
  background: '#2e8b57',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  marginRight: '1rem',
  cursor: 'pointer'
};

const logoutBtn = {
  background: 'red',
  color: 'white',
  border: 'none',
  padding: '0.4rem 1rem',
  borderRadius: '5px',
  cursor: 'pointer',
  height: 'fit-content'
};

export default AdminDashboard;
