import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State untuk menyimpan data formulir
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: "",
    steps: "",
    image: "",
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3001/recipes/${id}`);
        const recipe = await response.json();

        setFormData({
          name: recipe.name,
          category: recipe.category,
          ingredients: recipe.ingredients.join("\n"),
          steps: recipe.steps.join("\n"),
          image: recipe.image,
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Resep tidak ditemukan!",
        }).then(() => navigate("/"));
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      name: formData.name,
      category: formData.category,
      ingredients: formData.ingredients.split("\n").map((item) => item.trim()),
      steps: formData.steps.split("\n").map((item) => item.trim()),
      image: formData.image || "https://via.placeholder.com/300x200.png?text=Resep+Baru",
    };

    try {
      const response = await fetch(`http://localhost:3001/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Resep berhasil diperbarui!",
        }).then(() => navigate(`/recipe/${id}`));
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: `Gagal memperbarui resep: ${errorData.message || "Unknown error"}`,
        });
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat memperbarui resep.",
      });
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Resep</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nama Resep</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input input-bordered bg-white text-black"
            required
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
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="input input-bordered bg-white text-black"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Bahan-bahan (masukkan satu per baris)</span>
          </label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
            className="textarea textarea-bordered bg-white text-black"
            required
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Langkah-langkah (masukkan satu per baris)</span>
          </label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
            className="textarea textarea-bordered bg-white text-black"
            required
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Gambar (opsional)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setFormData({ ...formData, image: reader.result });
                reader.readAsDataURL(file);
              }
            }}
            className="file-input file-input-bordered bg-white text-black"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
