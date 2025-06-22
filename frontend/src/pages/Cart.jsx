// import React, { useEffect, useState } from 'react';
// import api from '../api';
// import ProductCard from '../components/ProductCard';

// export default function Cart() {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     api.get('/cart').then(res => setItems(res.data));
//   }, []);

//   const remove = async id => {
//     const res = await api.delete(`/cart/${id}`);
//     setItems(res.data);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
//       {items.length === 0 ? (
//         <p>No items in cart.</p>
//       ) : (
//         <div className="space-y-4">
//           {items.map(ci => (
//             <div key={ci.productId} className="flex items-center space-x-4">
//               <ProductCard listing={ci.listing} />
//               <button
//                 onClick={() => remove(ci.productId)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, increment, decrement, remove } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      alert('Please log in or register before checking out.');
      navigate('/login');
      return;
    }

    alert('Proceeding to checkout...');
    // add future checkout route here
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Your cart is empty. Let’s shop together!</h2>
        <button onClick={() => navigate('/products')} style={browseBtn}>Browse Products</button>
      </div>
    );
  }

  return (
    <div style={container}>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id} style={card}>
          <h3>{item.name}</h3>
          <p><strong>Price:</strong> ${item.price}</p>
          <div style={qtyRow}>
            <span><strong>Quantity:</strong></span>
            <button onClick={() => decrement(item.id)} style={qtyBtn}>−</button>
            <span>{item.qty}</span>
            <button onClick={() => increment(item.id)} style={qtyBtn}>+</button>
          </div>
          <p><strong>Subtotal:</strong> ${(item.qty * item.price).toFixed(2)}</p>
          <button onClick={() => remove(item.id)} style={removeBtn}>Remove</button>
        </div>
      ))}

      <div style={summaryBox}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={handleCheckout} style={checkoutBtn}>Checkout</button>
      </div>
    </div>
  );
};

const container = {
  padding: '2rem',
  maxWidth: '700px',
  margin: 'auto'
};

const card = {
  background: '#f9f9f9',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  marginBottom: '1.5rem'
};

const qtyRow = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  marginBottom: '0.5rem'
};

const qtyBtn = {
  padding: '0.3rem 0.7rem',
  fontSize: '1rem',
  cursor: 'pointer',
  background: '#eee',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const removeBtn = {
  background: 'red',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  cursor: 'pointer'
};

const summaryBox = {
  textAlign: 'right',
  marginTop: '2rem'
};

const checkoutBtn = {
  padding: '0.7rem 1.5rem',
  fontSize: '1rem',
  background: '#2e8b57',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const browseBtn = {
  padding: '0.6rem 1.2rem',
  fontSize: '1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  marginTop: '1rem'
};

export default Cart;
