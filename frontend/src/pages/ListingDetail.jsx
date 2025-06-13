// frontend/src/pages/ListingDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/listings/${id}`)
      .then(res => setListing(res.data))
      .catch(console.error);
  }, [id]);

  const addWishlist = () => {
    // here!!
  };

  const sendMessage = () => {
    // here!!
  };

  if (!listing) return <p>Loading…</p>;
  return (
    <div>
        // code here
    </div>
  );
}
