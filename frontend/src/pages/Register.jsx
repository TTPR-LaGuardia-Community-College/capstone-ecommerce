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
import { AuthContext } from "../context/AuthContext.jsx";

function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "", email: "", password: ""
  });
  const [err, setErr] = useState("");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await register(form.username, form.email, form.password);
      navigate("/login");
    } catch (error) {
      setErr("Registration failed");
    }
  }

  return (
    <div className="auth-page">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        {err && <p className="error">{err}</p>}
        <label>
          Username:
          <input name="username" onChange={onChange} required />
        </label>
        <label>
          Email:
          <input name="email" type="email" onChange={onChange} required />
        </label>
        <label>
          Password:
          <input name="password" type="password" onChange={onChange} required />
        </label>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
}

export default Register;
