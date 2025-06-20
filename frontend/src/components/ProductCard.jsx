import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ listing }) {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <Link to={`/listings/${listing.id}`}>
        <img
          src={listing.imageUrl || '/placeholder.png'}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="font-bold text-lg">{listing.title}</h2>
          <p className="text-gray-600">${listing.price}</p>
        </div>
      </Link>
    </div>
  );
}
