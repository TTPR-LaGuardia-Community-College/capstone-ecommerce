// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminRegister = () => {
//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     cunyId: '',
//     phone: '',
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
//       setError("Passwords don't match.");
//       return;
//     }

//     // Store data locally (for now)
//     localStorage.setItem('admin', JSON.stringify(form));
//     alert('Admin registered!');
//     navigate('/admin-login');
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: '3rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '10px' }}>
//       <h2>Admin Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={form.fullName}
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
//           type="text"
//           name="cunyId"
//           placeholder="CUNY ID"
//           value={form.cunyId}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={form.phone}
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
//         <button type="submit" style={buttonStyle}>Register</button>
//       </form>
//     </div>
//   );
// };

// const inputStyle = {
//   width: '100%',
//   padding: '0.6rem',
//   marginBottom: '1rem',
//   borderRadius: '5px',
//   border: '1px solid #ccc'
// };

// const buttonStyle = {
//   width: '100%',
//   padding: '0.7rem',
//   background: '#2e8b57',
//   color: 'white',
//   border: 'none',
//   borderRadius: '5px'
// };

// export default AdminRegister;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

function AdminRegister() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", secret: "" });
  const [err, setErr] = useState("");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      // if you require a secret code for admin
      await api.post("/admin/register", form);
      nav("/admin/login");
    } catch {
      setErr("Registration failed");
    }
  }

  return (
    <div className="auth-page">
      <h1>Admin Register</h1>
      <form onSubmit={onSubmit}>
        {err && <p className="error">{err}</p>}
        <label>Email:
          <input name="email" type="email" onChange={onChange} required/>
        </label>
        <label>Password:
          <input name="password" type="password" onChange={onChange} required/>
        </label>
        <label>Secret Code:
          <input name="secret" onChange={onChange} required/>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default AdminRegister;
