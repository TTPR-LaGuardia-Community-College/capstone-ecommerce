// import React from 'react';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const { cart, increment, decrement, remove } = useCart();
//   const total = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user) {
//       alert('Please log in or register before checking out.');
//       navigate('/login');
//       return;
//     }

//     alert('Proceeding to checkout...');
//   };

//   if (cart.length === 0) {
//     return (
//       <div style={{ padding: '2rem', textAlign: 'center' }}>
//         <h2>Your cart is empty. Let’s shop together!</h2>
//         <button onClick={() => navigate('/products')} style={browseBtn}>Browse Products</button>
//       </div>
//     );
//   }

//   return (
//     <div style={container}>
//       <h2>Your Cart</h2>
//       {cart.map(item => (
//         <div key={item.id} style={card}>
//           <h3>{item.name}</h3>
//           <p><strong>Price:</strong> ${item.price}</p>
//           <div style={qtyRow}>
//             <span><strong>Quantity:</strong></span>
//             <button onClick={() => decrement(item.id)} style={qtyBtn}>−</button>
//             <span>{item.qty || 1}</span>
//             <button onClick={() => increment(item.id)} style={qtyBtn}>+</button>
//           </div>
//           <p><strong>Subtotal:</strong> ${(item.price * (item.qty || 1)).toFixed(2)}</p>
//           <button onClick={() => remove(item.id)} style={removeBtn}>Remove</button>
//         </div>
//       ))}

//       <div style={summaryBox}>
//         <h3>Total: ${total.toFixed(2)}</h3>
//         <button onClick={handleCheckout} style={checkoutBtn}>Checkout</button>
//       </div>
//     </div>
//   );
// };

// const container = {
//   padding: '2rem',
//   maxWidth: '700px',
//   margin: 'auto'
// };

// const card = {
//   background: '#f9f9f9',
//   padding: '1rem',
//   borderRadius: '8px',
//   boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
//   marginBottom: '1.5rem'
// };

// const qtyRow = {
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.6rem',
//   marginBottom: '0.5rem'
// };

// const qtyBtn = {
//   padding: '0.3rem 0.7rem',
//   fontSize: '1rem',
//   cursor: 'pointer',
//   background: '#eee',
//   border: '1px solid #ccc',
//   borderRadius: '4px'
// };

// const removeBtn = {
//   background: 'red',
//   color: '#fff',
//   border: 'none',
//   padding: '0.5rem 1rem',
//   borderRadius: '5px',
//   cursor: 'pointer'
// };

// const summaryBox = {
//   textAlign: 'right',
//   marginTop: '2rem'
// };

// const checkoutBtn = {
//   padding: '0.7rem 1.5rem',
//   fontSize: '1rem',
//   background: '#2e8b57',
//   color: '#fff',
//   border: 'none',
//   borderRadius: '6px',
//   cursor: 'pointer'
// };

// const browseBtn = {
//   padding: '0.6rem 1.2rem',
//   fontSize: '1rem',
//   backgroundColor: '#007bff',
//   color: 'white',
//   border: 'none',
//   borderRadius: '5px',
//   marginTop: '1rem'
// };

// export default Cart;


import React, { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Cart.css";

export default function Cart() {
  const {
    items,
    loading,
    error,
    removeFromCart,
    clearCart,
    cartCount,
    totalPrice
  } = useContext(CartContext);

  const onRemove = async (id) => {
    try {
      await removeFromCart(id);
      toast.info("Removed from cart");
    } catch {
      toast.error("Failed to remove");
    }
  };

  if (loading) return <p>Loading cart…</p>;
  if (error)   return <p className="error">{error}</p>;
  if (!items.length)
    return <p>Your cart is empty. <Link to="/products">Browse products.</Link></p>;

  return (
    <div className="cart-page">
      <h1>Your Cart ({cartCount})</h1>
      <ul className="cart-list">
        {items.map((i) => (
          <li key={i.productId}>
            <Link to={`/products/${i.productId}`}>
              {i.Listing.title}
            </Link>
            <span>${parseFloat(i.Listing.price).toFixed(2)}</span>
            <button onClick={() => onRemove(i.productId)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-footer">
        <strong>Total:</strong> ${totalPrice.toFixed(2)}
        <button className="danger" onClick={clearCart}>
          Clear Cart
        </button>
        <Link to="/checkout">
          <button>Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
}

