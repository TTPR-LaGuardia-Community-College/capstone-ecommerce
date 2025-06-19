import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const price       = Number(product.price).toFixed(2);

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <Link to={`/products/${product.id}`}>
          <img src={product.imageUrl} alt={product.title} />
        </Link>

        <button
          className="btn add-to-cart"
          onClick={() => addToCart(product.id)}
        >
          Add to cart
        </button>

        <button
          className={`btn wish-btn ${wishlisted ? "wishlisted" : ""}`}
          onClick={() =>
            wishlisted
              ? removeFromWishlist(product.id)
              : addToWishlist(product.id)
          }
        >
          {wishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="info">
        <Link to={`/products/${product.id}`}>
          <h3>{product.title}</h3>
        </Link>
        <p>${price}</p>
      </div>
    </div>
  );
}
