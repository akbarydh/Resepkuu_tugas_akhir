import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: "",
    steps: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null); // Untuk preview gambar
  const [loading, setLoading] = useState(false); // State untuk loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi tambahan untuk ingredients dan steps
    if (!formData.ingredients.includes(",") || !formData.steps.includes(".")) {
      alert("Pastikan bahan dipisahkan dengan koma dan langkah dipisahkan dengan titik.");
      return;
    }

    setLoading(true); // Mulai loading

    const newRecipe = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category.trim(),
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      steps: formData.steps.split(".").map((item) => item.trim()),
      image: formData.image || "https://via.placeholder.com/300x200.png?text=Resep+Baru",
    };

    try {
      const response = await fetch("http://localhost:3001/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        alert("Resep berhasil ditambahkan!");
        navigate("/"); // Redirect ke halaman Home
      } else {
        const errorData = await response.json();
        alert(`Gagal menambahkan resep: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menambahkan resep.");
    } finally {
      setLoading(false); // Selesai loading
    }
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
        <div>
          <label className="block font-medium">Pilih Gambar (opsional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded px-3 py-2 w-full"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-w-md"
                onError={(e) => (e.target.src = "https://via.placeholder.com/300x200.png?text=Error+Loading+Image")}
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {loading ? "Menambahkan..." : "Tambah Resep"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
