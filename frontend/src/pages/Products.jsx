import React, { useState, useEffect } from 'react';
import './Products.css';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Products = () => {
  const { addToCart, likeProduct, likedItems, unlikeProduct } = useCart();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('');
  const [message, setMessage] = useState('');
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const defaultProducts = [
      {
        id: 1,
        name: "AirPods Pro",
        price: 199.99,
        description: "Noise-cancelling wireless earbuds",
        category: "Electronics",
        image: "https://via.placeholder.com/150"
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 149.99,
        description: "Fitness tracking smartwatch",
        category: "Electronics",
        image: "https://via.placeholder.com/150"
      },
      {
        id: 3,
        name: "Bluetooth Speaker",
        price: 89.99,
        description: "Portable high-quality sound speaker",
        category: "Accessories",
        image: "https://via.placeholder.com/150"
      },
      {
        id: 4,
        name: "College Math Textbook",
        price: 59.99,
        description: "Essential for college algebra and calculus",
        category: "Books",
        image: "https://via.placeholder.com/150"
      }
    ];

    const savedListings = JSON.parse(localStorage.getItem('productListings')) || [];
    setAllProducts([...defaultProducts, ...savedListings]);
  }, []);

  const handleAdd = (product) => {
    addToCart(product);
    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setMessage(''), 2000);
  };

  const filteredProducts = allProducts
    .filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      (category === 'All' || p.category === category)
    )
    .sort((a, b) => {
      if (sortOrder === 'low') return a.price - b.price;
      if (sortOrder === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="products-page">
      <h2>All Products</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, minWidth: '200px', padding: '0.5rem' }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '0.5rem' }}>
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Accessories">Accessories</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '0.5rem' }}>
          <option value="">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Message */}
      {message && (
        <div style={{ background: '#d4edda', color: '#155724', padding: '0.5rem 1rem', borderRadius: '5px', marginBottom: '1rem' }}>
          {message}
        </div>
      )}

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map(product => {
            const isLiked = likedItems.some(item => item.id === product.id);
            return (
              <div className="product-card" key={product.id}>
                {/* Clickable section */}
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img
                    src={product.image || product.imageUrl}
                    alt={product.name}
                    style={{ cursor: 'pointer' }}
                  />
                  <h4 style={{ cursor: 'pointer' }}>{product.name}</h4>
                  <p style={{ cursor: 'pointer' }}>${product.price}</p>
                  <p className="rating" style={{ cursor: 'pointer' }}>⭐⭐⭐⭐☆</p>
                </Link>

                {/* Buttons outside the link */}
                <button onClick={() => handleAdd(product)}>Add to Cart</button>
                <button
                  onClick={() => {
                    isLiked ? unlikeProduct(product.id) : likeProduct(product);
                  }}
                  style={{ marginTop: '0.5rem' }}
                >
                  {isLiked ? '❤️ Liked' : '🤍 Like'}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Products;
