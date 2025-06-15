// src/components/ProductCard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLiked(likedItems.some((item) => item.id === product.id));
  }, [product.id]);

  const toggleLike = (e) => {
    e.stopPropagation();
    const likedItems = JSON.parse(localStorage.getItem("likedProducts")) || [];

    let updatedLikedItems;
    if (liked) {
      updatedLikedItems = likedItems.filter((item) => item.id !== product.id);
    } else {
      updatedLikedItems = [...likedItems, product];
    }

    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedItems));
    setLiked(!liked);

    if (!liked) {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      if (!cartItems.some((item) => item.id === product.id)) {
        localStorage.setItem("cart", JSON.stringify([...cartItems, product]));
      }
    }
  };

  return (
    <div
      className="border rounded-lg p-4 hover:shadow cursor-pointer relative"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-700">${product.price}</p>
      <button
        className="absolute top-2 right-2 text-red-500"
        onClick={toggleLike}
        aria-label="Like"
      >
        <Heart fill={liked ? "red" : "none"} />
      </button>
    </div>
  );
};

export default ProductCard;
