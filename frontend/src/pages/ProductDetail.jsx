import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, likeProduct, unlikeProduct, likedItems } = useCart();

  const [product, setProduct] = useState(null);

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

    const saved = JSON.parse(localStorage.getItem('productListings')) || [];
    const all = [...defaultProducts, ...saved];
    const found = all.find(p => String(p.id) === id);
    if (!found) return navigate('/products');
    setProduct(found);
  }, [id, navigate]);

  if (!product) return null;

  const isLiked = likedItems.some(item => item.id === product.id);

  return (
    <div style={container}>
      <div style={imageSection}>
        <img src={product.image || product.imageUrl} alt={product.name} style={image} />
      </div>
      <div style={infoSection}>
        <h2>{product.name}</h2>
        <p style={price}>${product.price}</p>
        <p>{product.description}</p>

        <button onClick={() => addToCart(product)} style={button}>
          🛒 Add to Cart
        </button>

        <button
          onClick={() => {
            isLiked ? unlikeProduct(product.id) : likeProduct(product);
          }}
          style={{ ...button, marginTop: '1rem' }}
        >
          {isLiked ? '❤️ Liked' : '🤍 Like'}
        </button>
      </div>
    </div>
  );
};

const container = {
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: '900px',
  margin: '2rem auto',
  padding: '2rem',
  gap: '2rem',
  border: '1px solid #eee',
  borderRadius: '10px',
  background: '#fff',
  boxShadow: '0 0 10px rgba(0,0,0,0.05)',
  fontFamily: 'Segoe UI, sans-serif'
};

const imageSection = {
  flex: '1 1 300px',
  textAlign: 'center'
};

const image = {
  width: '100%',
  maxWidth: '400px',
  height: 'auto',
  objectFit: 'contain',
  borderRadius: '8px'
};

const infoSection = {
  flex: '1 1 300px'
};

const price = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#2e8b57'
};

const button = {
  padding: '0.8rem 1.2rem',
  backgroundColor: '#2e8b57',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1rem',
  cursor: 'pointer'
};

export default ProductDetail;
