import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: "",
    steps: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    const newRecipe = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      ingredients: formData.ingredients.split("\n").map((item) => item.trim()),
      steps: formData.steps.split("\n").map((item) => item.trim()),
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
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Resep berhasil ditambahkan!",
        }).then(() => {
          navigate("/");
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: `Gagal menambahkan resep: ${errorData.message || "Unknown error"}`,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menambahkan resep.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-serif text-gray-800 text-center mb-8">
        Tambah Resep Baru
      </h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Nama Resep</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Masukkan nama resep"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Kategori</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Masukkan kategori resep"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Bahan-bahan (masukkan satu per baris)
          </label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Masukkan bahan-bahan"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Langkah-langkah (masukkan satu per baris)
          </label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Masukkan langkah-langkah"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Pilih Gambar (opsional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full rounded-lg shadow-md"
                onError={(e) => (e.target.src = "https://via.placeholder.com/300x200.png?text=Error+Loading+Image")}
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gray-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-gray-700 transition duration-200 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Menambahkan..." : "Tambah Resep"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
