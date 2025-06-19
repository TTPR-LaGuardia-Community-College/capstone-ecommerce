// src/pages/LikedProducts.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const LikedProducts = () => {
  const { likedItems } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-10">Liked Products</h2>

      {likedItems.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t liked any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {likedItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedProducts;
