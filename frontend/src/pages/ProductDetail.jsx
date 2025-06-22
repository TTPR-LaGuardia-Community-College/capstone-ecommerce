import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    api.get(`/listings/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => setError(err.response?.data?.error || 'Failed to load product'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center p-8">Loading product…</p>;
  if (error)   return <p className="text-center text-red-500 p-8">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img
        src={product.imageUrl || '/placeholder.png'}
        alt={product.title}
        className="w-full h-64 object-cover rounded"
      />

      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-700 text-xl mt-2">${product.price}</p>

      <div className="prose prose-lg mt-6">
        {product.description}
      </div>

      <p className="text-gray-500 mt-6">
        <span className="font-semibold">Seller:</span> {product.owner?.username || '—'}
      </p>
    </div>
  );
}
