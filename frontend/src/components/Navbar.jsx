// src/components/Navbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount }    = useCart();
  const navigate         = useNavigate();

  function onLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav__item">Home</NavLink>

      <div className="nav__item dropdown">
        <span>Products ▾</span>
        <ul className="dropdown-menu">
          <li>
            <NavLink to="/products" className="dropdown__link">
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/products?sort=new" className="dropdown__link">
              New Products
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/wishlist" className="dropdown__link">
                Wishlist
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {user && (
        <NavLink to="/cart" className="nav__item">
          Cart{cartCount > 0 && <span className="badge">{cartCount}</span>}
        </NavLink>
      )}

      {user ? (
        <button onClick={onLogout} className="nav__item">
          Logout
        </button>
      ) : (
        <>
          <NavLink to="/login" className="nav__item">Login</NavLink>
          <NavLink to="/register" className="nav__item">Register</NavLink>
        </>
      )}
    </nav>
);
}
