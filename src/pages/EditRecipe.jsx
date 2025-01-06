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
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Resep</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Nama Resep</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Kategori</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Bahan-bahan</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200"
            rows="5"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Langkah-langkah</label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200"
            rows="5"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Gambar</label>
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
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 focus:ring focus:ring-green-200"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
