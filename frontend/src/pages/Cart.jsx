import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/cart').then(res => setItems(res.data));
  }, []);

  const remove = async id => {
    const res = await api.delete(`/cart/${id}`);
    setItems(res.data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="space-y-4">
          {items.map(ci => (
            <div key={ci.productId} className="flex items-center space-x-4">
              <ProductCard listing={ci.listing} />
              <button
                onClick={() => remove(ci.productId)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
