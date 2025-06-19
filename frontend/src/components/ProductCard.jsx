import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { WishlistContext } from "../context/WishlistContext.jsx";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart }       = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isWishlisted } =
    useContext(WishlistContext);
  const [hover, setHover]    = useState(false);

  const wishlisted = isWishlisted(product.id);

  function toggleWish() {
    wishlisted
      ? removeFromWishlist(product.id)
      : addToWishlist(product.id);
  }

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} alt={product.title} />
      </Link>

      {hover && (
        <div className="overlay">
          <button
            disabled={!product.inStock}
            onClick={() => addToCart(product.id)}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
          <button onClick={toggleWish} className="wish-btn">
            {wishlisted ? "♥" : "♡"}
          </button>
        </div>
      )}

      <Link to={`/products/${product.id}`}>
        <h3>{product.title}</h3>
      </Link>
      <p>${product.price.toFixed(2)}</p>
    </div>
  );
}
