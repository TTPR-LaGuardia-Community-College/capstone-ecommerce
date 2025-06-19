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
import { toast } from "react-toastify";

export default function EditListing() {
  const { id } = useParams();    
  const nav     = useNavigate();
  const isNew   = id === "new";

  const [form, setForm]     = useState({ title:"",desc:"",price:0,cat:"",imageUrl:""});
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      api.get(`/admin/listings/${id}`)
        .then(res => setForm(res.data))
        .catch(err => setError("Failed to load"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isNew) {
        await api.post("/admin/listings", form);
        toast.success("Listing created!");
      } else {
        await api.put(`/admin/listings/${id}`, form);
        toast.success("Listing updated!");
      }
      nav("/admin/listings");
    } catch (err) {
      setError(err.response?.data?.error || "Save failed");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading…</p>;

  return (
    <form onSubmit={onSubmit}>
      {error && <p className="error">{error}</p>}
      <label>Title<input name="title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/></label>
      {/* …other fields… */}
      <button type="submit" disabled={loading}>
        {isNew ? "Create" : "Save"}
      </button>
    </form>
  );
}

