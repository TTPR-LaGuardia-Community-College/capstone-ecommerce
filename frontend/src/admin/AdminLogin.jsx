import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedAdmin = JSON.parse(localStorage.getItem('admin'));

    if (
      storedAdmin &&
      storedAdmin.email.toLowerCase() === email.trim().toLowerCase() &&
      storedAdmin.password === password.trim()
    ) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('loggedInAdmin', JSON.stringify(storedAdmin));
      alert('Login successful!');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={container}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={input}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={button}>Login</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Don’t have an account?{' '}
        <Link to="/admin-register" style={{ color: '#007bff' }}>Sign up</Link>
      </p>
      <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
        <Link to="/admin-forgot-password" style={{ color: '#007bff' }}>Forgot password?</Link>
      </p>
    </div>
  );
};

const container = {
  maxWidth: '400px',
  margin: '5rem auto',
  padding: '2rem',
  border: '1px solid #ddd',
  borderRadius: '10px'
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
  background: '#2e8b57',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default AdminLogin;
