// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       localStorage.setItem("token", data.token);
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     }
//   }

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <br />
//           <input name="email" type="email" onChange={handleChange} required />
//         </label>
//         <br />
//         <label>
//           Password:
//           <br />
//           <input
//             name="password"
//             type="password"
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         No account? <Link to="/register">Register here</Link>.
//       </p>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import "./Auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({ email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(form.email, form.password);
    setLoading(false);
    if (success) {
      toast.success("Logged in!");
      navigate(state?.from?.pathname || "/", { replace: true });
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit}>
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
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
      <p>
        No account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
}


