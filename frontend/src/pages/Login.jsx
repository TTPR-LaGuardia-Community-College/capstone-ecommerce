import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <br />
          <input name="email" type="email" onChange={handleChange} required />
        </label>
        <br />
        <label>
          Password:
          <br />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        No account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
}

export default Login;
