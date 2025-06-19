// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [cunyId, setCunyId] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleReset = (e) => {
//     e.preventDefault();
//     const storedAdmin = JSON.parse(localStorage.getItem('admin'));

//     if (!storedAdmin || storedAdmin.email !== email || storedAdmin.cunyId !== cunyId) {
//       setError('No matching admin found');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     const updatedAdmin = { ...storedAdmin, password: newPassword };
//     localStorage.setItem('admin', JSON.stringify(updatedAdmin));
//     setSuccess('Password updated! Redirecting to login...');

//     setTimeout(() => {
//       navigate('/admin');
//     }, 2000);
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '5rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '10px' }}>
//       <h2>Reset Admin Password</h2>
//       <form onSubmit={handleReset}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//           style={input}
//         />
//         <input
//           type="text"
//           placeholder="CUNY ID"
//           value={cunyId}
//           onChange={e => setCunyId(e.target.value)}
//           required
//           style={input}
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={e => setNewPassword(e.target.value)}
//           required
//           style={input}
//         />
//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           onChange={e => setConfirmPassword(e.target.value)}
//           required
//           style={input}
//         />
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {success && <p style={{ color: 'green' }}>{success}</p>}
//         <button type="submit" style={button}>Reset Password</button>
//       </form>
//     </div>
//   );
// };

// const input = {
//   width: '100%',
//   padding: '0.5rem',
//   marginBottom: '1rem',
//   borderRadius: '5px',
//   border: '1px solid #ccc'
// };

// const button = {
//   width: '100%',
//   padding: '0.6rem',
//   background: '#007bff',
//   color: 'white',
//   border: 'none',
//   borderRadius: '5px'
// };

// export default AdminForgotPassword;
import React, { useState } from "react";
import api from "../api.js";
import { toast } from "react-toastify";
import "./Auth.css";

function AdminForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/admin/forgot-password", { email });
      setSent(true);
      toast.success("If that email exists, you’ll get reset instructions shortly.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="auth-page">
        <p>Check your email for reset instructions.</p>
        <button onClick={() => setSent(false)}>Send Again</button>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <h1>Reset Admin Password</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={onSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}

export default AdminForgotPassword;
