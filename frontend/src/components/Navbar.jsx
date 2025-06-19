import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { CartContext } from "../context/CartContext.jsx";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount }    = useContext(CartContext);
  const [open, setOpen]  = useState(false);
  const [dark, setDark]  = useState(false);
  const nav              = useNavigate();

  function onLogout() {
    logout();
    nav("/");
  }

  function toggleDark() {
    setDark(d => !d);
    document.documentElement.classList.toggle("dark", !dark);
  }

  return (
    <header className="navbar">
      <button
        className="navbar__burger"
        aria-label="Menu"
        onClick={() => setOpen(o => !o)}
      >
        ☰
      </button>

      <nav className={`navbar__nav ${open ? "open" : ""}`}>
        <NavLink to="/"      className="nav__item">Home</NavLink>
        <NavLink to="/products" className="nav__item">Products</NavLink>
        {user && (
          <>
            <NavLink to="/cart" className="nav__item">
              Cart{cartCount > 0 && <span className="badge">{cartCount}</span>}
            </NavLink>
            <NavLink to="/wishlist" className="nav__item">Wishlist</NavLink>
            <NavLink to="/messages" className="nav__item">Messages</NavLink>
          </>
        )}
        {user?.role === "admin" && (
          <NavLink to="/admin" className="nav__item">Admin</NavLink>
        )}

        <button onClick={toggleDark} className="nav__item">
          {dark ? "☀️" : "🌙"}
        </button>

        {user ? (
          <button onClick={onLogout} className="nav__item">
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login"    className="nav__item">Login</NavLink>
            <NavLink to="/register" className="nav__item">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
