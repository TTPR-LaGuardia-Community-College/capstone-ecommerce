import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function ListingForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    imageFile: null,
    imagePreview: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // If editing, load the existing listing
  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    api
      .get(`/listings/${id}`)
      .then((res) => {
        const { title, description, price, category, imageUrl } = res.data;
        setForm({
          title,
          description,
          price: price.toString(),
          category,
          imageFile: null,
          imagePreview: imageUrl || '',
        });
      })
      .catch((err) => setError(err.response?.data?.error || 'Failed to load listing'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((f) => ({
        ...f,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', form.title);
      data.append('description', form.description);
      data.append('price', form.price);
      data.append('category', form.category);
      if (form.imageFile) {
        data.append('image', form.imageFile);
      }

      let res;
      if (isEdit) {
        res = await api.put(`/listings/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await api.post('/listings', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      navigate(`/products/${res.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? 'Edit Listing' : 'Create New Listing'}
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="price">Price (USD)</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
        </div>

        {/* Image Upload & Preview */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="image">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600"
          />
          {form.imagePreview && (
            <img
              src={form.imagePreview}
              alt="Preview"
              className="mt-2 w-full h-48 object-cover rounded"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? (isEdit ? 'Updating…' : 'Creating…') : (isEdit ? 'Update Listing' : 'Create Listing')}
        </button>
      </form>
    </div>
  );
}
