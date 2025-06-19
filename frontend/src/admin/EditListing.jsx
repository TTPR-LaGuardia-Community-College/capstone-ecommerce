// // src/admin/EditListing.jsx
// import React from 'react';
// import { useParams } from 'react-router-dom';

// const EditListing = () => {
//   const { id } = useParams();

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Edit Listing</h2>
//       <p>You're editing the product with ID: {id}</p>

//       {/* You can add the edit form here later */}
//     </div>
//   );
// };

// export default EditListing;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api.js";

function EditListing() {
  const { id } = useParams(); // "new" or an existing id
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", price: "", category: "", imageUrl: ""
  });

  useEffect(() => {
    if (id !== "new") {
      api.get(`/admin/listings/${id}`)
         .then(res => setForm(res.data))
         .catch(console.error);
    }
  }, [id]);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (id === "new") {
        await api.post("/admin/listings", form);
      } else {
        await api.put(`/admin/listings/${id}`, form);
      }
      nav("/admin/listings");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="edit-listing">
      <h1>{id === "new" ? "Create" : "Edit"} Listing</h1>
      <form onSubmit={onSubmit}>
        <label>Title:
          <input name="title" value={form.title} onChange={onChange} required/>
        </label>
        <label>Description:
          <textarea name="description" value={form.description} onChange={onChange} required/>
        </label>
        <label>Price:
          <input name="price" type="number" value={form.price} onChange={onChange} required/>
        </label>
        <label>Category:
          <input name="category" value={form.category} onChange={onChange} required/>
        </label>
        <label>Image URL:
          <input name="imageUrl" value={form.imageUrl} onChange={onChange}/>
        </label>
        <button type="submit">{id === "new" ? "Create" : "Save"}</button>
      </form>
    </div>
  );
}

export default EditListing;
