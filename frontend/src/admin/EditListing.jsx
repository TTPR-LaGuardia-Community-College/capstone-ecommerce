// src/admin/EditListing.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const EditListing = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Listing</h2>
      <p>You're editing the product with ID: {id}</p>

      {/* You can add the edit form here later */}
    </div>
  );
};

export default EditListing;
