import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recipes } from "../data/recipes"; // Data dummy dari recipes.js

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: "",
    steps: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      id: recipes.length + 1,
      name: formData.name,
      category: formData.category,
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      steps: formData.steps.split(".").map((item) => item.trim()),
    };

    recipes.push(newRecipe); // Simulasi menambah data baru
    console.log("Resep baru:", newRecipe);
    navigate("/"); // Redirect ke halaman utama
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Tambah Resep Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nama Resep</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Kategori</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Bahan-bahan (pisahkan dengan koma)</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Langkah-langkah (pisahkan dengan titik)</label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tambah Resep
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
