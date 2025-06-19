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
import { AuthContext } from "../context/AuthContext.jsx";

function CreateListing() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: ""
  });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const payload = { ...form, price: parseFloat(form.price) };
      const res = await api.post("/products", payload);
      navigate(`/products/${res.data.id}`);
    } catch (err) {
      console.error("Failed to create listing", err);
    }
  }

  if (!user) return <p>Please login to create listings.</p>;

  return (
    <div className="create-listing">
      <h1>Create a New Listing</h1>
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input name="title" required onChange={onChange} />
        </label>
        <label>
          Description:
          <textarea name="description" required onChange={onChange} />
        </label>
        <label>
          Price:
          <input
            name="price"
            type="number"
            step="0.01"
            required
            onChange={onChange}
          />
        </label>
        <label>
          Category:
          <input name="category" required onChange={onChange} />
        </label>
        <label>
          Image URL:
          <input name="imageUrl" onChange={onChange} />
        </label>
        <button type="submit">Post Listing</button>
      </form>
    </div>
  );
}

export default CreateListing;
