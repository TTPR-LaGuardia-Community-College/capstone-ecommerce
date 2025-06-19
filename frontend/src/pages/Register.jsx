// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// const Signup = () => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     cunyId: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     const newUser = {
//       username: form.email,
//       password: form.password,
//       name: form.name,
//       phone: form.phone,
//       cunyId: form.cunyId
//     };

//     localStorage.setItem("user", JSON.stringify(newUser));
//     alert("Registration successful!");
//     navigate("/login");
//   };

//   return (
//     <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone Number"
//           value={form.phone}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <input
//           type="text"
//           name="cunyId"
//           placeholder="CUNY ID"
//           value={form.cunyId}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={form.confirmPassword}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />

//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         <button type="submit" style={buttonStyle}>Sign Up</button>
//       </form>

//       <p style={{ marginTop: '1rem' }}>
//         Already have an account? <Link to="/login">Log in here</Link>
//       </p>
//     </div>
//   );
// };

// const inputStyle = {
//   width: '100%',
//   padding: '0.5rem',
//   marginBottom: '1rem',
//   fontSize: '1rem'
// };

// const buttonStyle = {
//   width: '100%',
//   padding: '0.6rem',
//   backgroundColor: '#2e8b57',
//   color: 'white',
//   border: 'none',
//   fontSize: '1rem',
//   cursor: 'pointer'
// };

// export default Signup;


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import "./Auth.css";

export default function Register() {
  const { register } = useAuth();
  const nav           = useNavigate();
  const [form, setForm] = useState({ username:"", email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await register(form.username, form.email, form.password);
    setLoading(false);
    if (success) {
      toast.success("Registered! Please login.");
      nav("/login");
    } else {
      setError("Registration failed.");
    }
  };

  return (
    <div className="auth-page">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit}>
        <label>
          Username
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            required
            disabled={loading}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            disabled={loading}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            disabled={loading}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Registering…" : "Register"}
        </button>
      </form>
      <p>
        Already registered? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
}

