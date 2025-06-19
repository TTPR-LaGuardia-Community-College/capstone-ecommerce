import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      {user && <Link to="/cart">Cart</Link>}
      {user && <Link to="/wishlist">Wishlist</Link>}
      {user && <Link to="/messages">Messages</Link>}
      {user?.role === "admin" && <Link to="/admin">Admin</Link>}

      {user
        ? <button onClick={onLogout}>Logout</button>
        : <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
      }
    </nav>
  );
}
