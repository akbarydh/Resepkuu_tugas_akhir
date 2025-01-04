import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import "sweetalert2/src/sweetalert2.scss"; // Import SweetAlert2 styles

const AddRecipe = () => {
  // State untuk menyimpan data formulir
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: "",
    steps: "",
    image: "",
  });
  // State untuk pratinjau gambar
  const [imagePreview, setImagePreview] = useState(null);
  // State untuk status loading
  const [loading, setLoading] = useState(false);
  // Hook untuk navigasi
  const navigate = useNavigate();

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk menangani perubahan gambar
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

  // Fungsi untuk menangani submit formulir
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Membuat objek resep baru
    const newRecipe = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      ingredients: formData.ingredients.split("\n").map((item) => item.trim()), // Pisahkan bahan dengan baris baru
      steps: formData.steps.split("\n").map((item) => item.trim()), // Pisahkan langkah dengan baris baru
      image: formData.image || "https://via.placeholder.com/300x200.png?text=Resep+Baru",
    };

    try {
      // Mengirim data resep baru ke server
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
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Tambah Resep Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nama Resep</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered bg-white text-black"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Kategori</span>
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="input input-bordered bg-white text-black"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bahan-bahan (masukkan satu per baris)</span>
          </label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            className="textarea textarea-bordered bg-white text-black"
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Langkah-langkah (masukkan satu per baris)</span>
          </label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            required
            className="textarea textarea-bordered bg-white text-black"
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pilih Gambar (opsional)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered bg-white text-black"
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
          className={`btn ${loading ? "btn-disabled" : "btn-primary"}`}
        >
          {loading ? "Menambahkan..." : "Tambah Resep"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
