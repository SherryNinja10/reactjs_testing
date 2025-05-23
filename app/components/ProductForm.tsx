'use client';

import { useState } from 'react';
import { createProduct } from '@/app/actions/ProductActions';

interface prop {
    addedProduct: () => void;
}

export default function ProductForm({ addedProduct } : prop) {
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const form = e.currentTarget; // This is guaranteed to be HTMLFormElement
    const formData = new FormData(form);
  
    await createProduct(formData);
  
    addedProduct();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  
    form.reset(); // safe now!
  };

  return (
    <div className="mb-8 relative">
      <button
        onClick={toggleForm}
        type="button"
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Insert Product
      </button>

      {showPopup && (
        <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-2 rounded shadow-md animate-fade-in-out z-10">
          Product added!
        </div>
      )}

      <div
        className={`transition-all duration-500 ease-out overflow-hidden ${
          showForm ? 'max-h-[1000px] translate-y-0 opacity-100' : 'max-h-0 -translate-y-10 opacity-0'
        }`}
      >
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-sky-500">Add New Product</h2>

          <div className="mb-4">
            <label className="block mb-1 text-sky-500">Name</label>
            <input type="text" name="name" required className="border px-3 py-2 w-full rounded text-black" />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sky-500">Price</label>
            <input type="number" name="price" step="0.01" required className="border px-3 py-2 w-full rounded text-black" />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sky-500">Category</label>
            <input type="text" name="category" required className="border px-3 py-2 w-full rounded text-black" />
          </div>

          <div className="mb-4 text-sky-500">
            <label className="block mb-1">Stock</label>
            <input type="number" name="stock" required className="border px-3 py-2 w-full rounded text-black" />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
