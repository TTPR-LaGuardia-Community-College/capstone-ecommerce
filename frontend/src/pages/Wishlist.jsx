import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/wishlist').then(res => setItems(res.data));
  }, []);

  const remove = async listingId => {
    await api.delete(`/wishlist/${listingId}`);
    setItems(items.filter(w => w.listingId !== listingId));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(w => (
          <div key={w.listingId} className="relative">
            <ProductCard listing={w.listing} />
            <button
              onClick={() => remove(w.listingId)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
