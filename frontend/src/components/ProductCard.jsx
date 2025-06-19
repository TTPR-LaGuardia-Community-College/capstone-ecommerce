<<<<<<< HEAD
// src/components/ProductCard.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { likedItems, likeProduct, unlikeProduct, addToCart } = useCart();

  const isLiked = likedItems.some((item) => item.id === product.id);

  const toggleLike = (e) => {
    e.stopPropagation();
    isLiked ? unlikeProduct(product.id) : likeProduct(product);
  };
=======
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
>>>>>>> 91490b1a7a46b94bc266ad91512ee02371cf6cb8

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    alert(`${product.name} added to cart.`);
  };
  return (
<<<<<<< HEAD
    <button
      type="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      className="bg-white border rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/product/${product.id}`);
        }
      }}
      style={{ outline: "none" }}
    >
      <img
        src={product.image || product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700 mb-2">${product.price}</p>

      <div className="flex justify-center text-yellow-400 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={toggleLike}
          className={`px-4 py-2 rounded text-white ${
            isLiked ? "bg-pink-600" : "bg-gray-500"
          }`}
        >
          {isLiked ? "💗 Liked" : "🤍 Like"}
        </button>
      </div>
    </button>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
=======
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
>>>>>>> 91490b1a7a46b94bc266ad91512ee02371cf6cb8
