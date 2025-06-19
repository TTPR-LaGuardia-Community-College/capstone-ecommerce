 
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cart, likedItems } = useCart(); 

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">🏫 CampusTrade</NavLink>

      <div className="nav-links">
        <NavLink to="/" className="nav-item" activeclassname="active">Home</NavLink>
        <NavLink to="/admin" className="nav-item" activeclassname="active">Admin</NavLink>
        <NavLink to="/products" className="nav-item" activeclassname="active">Products</NavLink>

        <NavLink to="/cart" className="nav-item" activeclassname="active">
          Cart <span className="badge">{cart.length}</span>
        </NavLink>

        <NavLink to="/liked" className="nav-item" activeclassname="active">
          Liked <span className="badge">{likedItems.length}</span>
        </NavLink>

        <NavLink to="/create-listing" className="nav-item" activeclassname="active">Create Listing</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
