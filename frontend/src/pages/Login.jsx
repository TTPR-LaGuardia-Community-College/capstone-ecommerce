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
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (error) {
      setErr("Invalid credentials");
    }
  }

  return (
    <div className="auth-page">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        {err && <p className="error">{err}</p>}
        <label>
          Email:
          <input name="email" type="email" onChange={onChange} required />
        </label>
        <label>
          Password:
          <input name="password" type="password" onChange={onChange} required />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        No account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
}

export default Login;

