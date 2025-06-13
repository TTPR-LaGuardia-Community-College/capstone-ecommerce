import React, { useEffect, useState } from "react";
import api from "../api.js";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/wishlist")
      // add the code here to fetch api get request
  }, []);

  const remove = id => {
    api.delete(`/wishlist/${id}`).then(() =>
      setItems(items.filter(i => i.listingId !== id))
    );
  };

  return(
    <div>
        // add your code here guys
    </div>
  );
}