import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    api.get(`/listings/${id}`).then(res => setListing(res.data));
  }, [id]);

  if (!listing) return <p>Loading…</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img
        src={listing.imageUrl || '/placeholder.png'}
        alt={listing.title}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{listing.title}</h1>
      <p className="text-gray-700 mt-2">${listing.price}</p>
      <p className="mt-4">{listing.description}</p>
      <p className="text-gray-500 mt-4">
        Seller: {listing.owner?.username}
      </p>
    </div>
  );
}
