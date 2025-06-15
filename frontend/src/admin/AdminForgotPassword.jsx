import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [cunyId, setCunyId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const storedAdmin = JSON.parse(localStorage.getItem('admin'));

    if (!storedAdmin || storedAdmin.email !== email || storedAdmin.cunyId !== cunyId) {
      setError('No matching admin found');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const updatedAdmin = { ...storedAdmin, password: newPassword };
    localStorage.setItem('admin', JSON.stringify(updatedAdmin));
    setSuccess('Password updated! Redirecting to login...');

    setTimeout(() => {
      navigate('/admin');
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '5rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2>Reset Admin Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={input}
        />
        <input
          type="text"
          placeholder="CUNY ID"
          value={cunyId}
          onChange={e => setCunyId(e.target.value)}
          required
          style={input}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
          style={input}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          style={input}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" style={button}>Reset Password</button>
      </form>
    </div>
  );
};

const input = {
  width: '100%',
  padding: '0.5rem',
  marginBottom: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const button = {
  width: '100%',
  padding: '0.6rem',
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px'
};

export default AdminForgotPassword;
