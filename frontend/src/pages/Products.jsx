import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    api.get('/listings')
      .then(res => setProducts(res.data))
      .catch(err => setError(err.response?.data?.error || 'Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center p-8">Loading products…</p>;
  if (error)   return <p className="text-center text-red-500 p-8">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && Array.isArray(products) && products.map((prod) => (
          <ProductCard key={prod.id} listing={prod} />
        ))}
      </div>
    </div>
  );
}
