import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // State untuk loading
  const API_URL = "http://localhost:3001/recipes"; // URL ke JSON Server

  // Fungsi untuk mengambil semua resep
  const fetchRecipes = async () => {
    setLoading(true); // Mulai loading
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Gagal mengambil data resep");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  useEffect(() => {
    fetchRecipes(); // Panggil saat komponen pertama kali di-render
  }, []);

  // Fungsi untuk menghapus resep
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus resep ini?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Gagal menghapus resep");
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== id)
        );
        alert("Resep berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting recipe:", error.message);
        alert("Gagal menghapus resep, coba lagi.");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Daftar Resep</h2>
      <Link
        to="/add"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Tambah Resep
      </Link>
      {loading ? (
        <p>Sedang memuat data...</p>
      ) : recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id} className="mb-2 flex items-center justify-between">
              <div>
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {recipe.name}
                </Link>{" "}
                - {recipe.category}
              </div>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Tidak ada resep ditemukan.</p>
      )}
    </div>
  );
};

export default Home;
