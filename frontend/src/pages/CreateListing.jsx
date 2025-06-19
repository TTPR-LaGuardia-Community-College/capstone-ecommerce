import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
        }),
      });
      const data = await res.json();
      navigate(`/listings/${data.id}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Create Listing</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <br />
          <input name="title" onChange={handleChange} required />
        </label>
        <br />
        <label>
          Description:
          <br />
          <textarea name="description" onChange={handleChange} required />
        </label>
        <br />
        <label>
          Price:
          <br />
          <input
            name="price"
            type="number"
            step="0.01"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Category:
          <br />
          <input name="category" onChange={handleChange} required />
        </label>
        <br />
        <br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreateListing;
