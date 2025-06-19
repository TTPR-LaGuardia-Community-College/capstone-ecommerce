import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product.id)}>Add to Cart</button>
    </div>
  );
}
