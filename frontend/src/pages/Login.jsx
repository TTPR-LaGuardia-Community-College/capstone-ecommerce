import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (
      storedUser &&
      form.username === storedUser.username &&
      form.password === storedUser.password
    ) {
      login(form.username);
      navigate('/create-listing');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.6rem',
            backgroundColor: '#2e8b57',
            color: 'white',
            border: 'none'
          }}
        >
          Log In
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Not registered? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
