import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link>{" | "}
      {token ? (
        <>
          <Link to="/create">Create</Link>{" | "}
          <Link to="/wishlist">Wishlist</Link>{" | "}
          <Link to="/messages">Messages</Link>{" | "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
