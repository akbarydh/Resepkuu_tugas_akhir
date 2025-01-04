import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Swal from "sweetalert2"; // Import SweetAlert2
import "sweetalert2/src/sweetalert2.scss"; // Import SweetAlert2 styles

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
    // Ensure id is correctly used without conflicts
    const confirmDelete = await Swal.fire({
      title: "Yakin ingin menghapus resep ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Gagal menghapus resep");
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== id)
        );
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Resep berhasil dihapus!",
        });
      } catch (error) {
        console.error("Error deleting recipe:", error.message);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus resep, coba lagi.",
        });
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Daftar Resep</h2>
      <Link to="/add">
        <Button className="btn-primary mb-4">Tambah Resep</Button>
      </Link>
      {loading ? (
        <p>Sedang memuat data...</p>
      ) : recipes.length > 0 ? (
        <ul className="space-y-4">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-gray-50">
              <div>
                <Link to={`/recipe/${recipe.id}`} className="text-blue-600 hover:underline font-semibold">
                  {recipe.name}
                </Link>{" "}
                - {recipe.category}
              </div>
              <div className="flex gap-2">
                <Link to={`/edit/${recipe.id}`}>
                  <Button className="btn-success text-white bg-green-500 hover:bg-green-700">Edit</Button>
                </Link>
                <Button onClick={() => handleDelete(recipe.id)} className="btn-error text-white bg-red-500 hover:bg-red-700">
                  Hapus
                </Button>
              </div>
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
