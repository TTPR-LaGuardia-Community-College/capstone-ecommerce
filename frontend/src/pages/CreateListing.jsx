// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function CreateListing() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     category: "",
//   });

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/listings`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           ...form,
//           price: parseFloat(form.price),
//         }),
//       });
//       const data = await res.json();
//       navigate(`/listings/${data.id}`);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h1>Create Listing</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <br />
//           <input name="title" onChange={handleChange} required />
//         </label>
//         <br />
//         <label>
//           Description:
//           <br />
//           <textarea name="description" onChange={handleChange} required />
//         </label>
//         <br />
//         <label>
//           Price:
//           <br />
//           <input
//             name="price"
//             type="number"
//             step="0.01"
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Category:
//           <br />
//           <input name="category" onChange={handleChange} required />
//         </label>
//         <br />
//         <br />
//         <button type="submit">Post</button>
//       </form>
//     </div>
//   );
// }

// export default CreateListing;


import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import "./CreateListing.css";

export default function CreateListing() {
  const { user }   = useAuth();
  const nav        = useNavigate();
  const [form, setForm]     = useState({ title:"",desc:"",price:"",cat:"",imageUrl:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  if (!user) return <p>Please <Link to="/login">login</Link> to post a listing.</p>;

  const onChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.title.length < 3) {
      return setError("Title must be at least 3 characters.");
    }
    setLoading(true);
    try {
      const payload = {
        title:       form.title,
        description: form.desc,
        price:       parseFloat(form.price),
        category:    form.cat,
        imageUrl:    form.imageUrl || null,
      };
      const res = await api.post("/listings", payload);
      toast.success("Listing created!");
      nav(`/products/${res.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-listing">
      <h1>Create a New Listing</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit}>
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            required
            disabled={loading}
          />
        </label>
        <label>
          Description
          <textarea
            name="desc"
            value={form.desc}
            onChange={onChange}
            required
            disabled={loading}
          />
        </label>
        <label>
          Price
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={onChange}
            required
            disabled={loading}
          />
        </label>
        <label>
          Category
          <input
            name="cat"
            value={form.cat}
            onChange={onChange}
            required
            disabled={loading}
          />
        </label>
        <label>
          Image URL
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={onChange}
            disabled={loading}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Posting…" : "Post Listing"}
        </button>
      </form>
    </div>
  );
}

