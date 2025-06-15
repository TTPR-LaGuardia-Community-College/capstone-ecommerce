// src/pages/LikedProducts.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LikedProducts = () => {
  const likedItems = JSON.parse(localStorage.getItem("likedProducts")) || [];
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Liked Products</h2>
      {likedItems.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">You haven’t liked any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {likedItems.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-2" />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700">${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedProducts;
