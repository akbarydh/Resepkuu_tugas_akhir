import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Swal from "sweetalert2"; // Import SweetAlert2
import "sweetalert2/src/sweetalert2.scss"; // Import SweetAlert2 styles

const Home = () => { 
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:3001/recipes";

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Gagal mengambil data resep");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);


  const handleDelete = async (id) => {
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
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-serif text-gray-800 text-center mb-8">
        Resep Favoritmu
      </h1>
      <div className="flex justify-center mb-10">
        <Link to="/add">
          <Button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg shadow-lg">
            Tambah Resep
          </Button>
        </Link>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Memuat data resep...</p>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/recipe/${recipe.id}`}>
                <img
                  src={recipe.image || "https://via.placeholder.com/300"}
                  alt={recipe.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="text-lg font-bold text-gray-800 hover:text-gray-600 block mb-2"
                >
                  {recipe.name}
                </Link>
                <p className="text-sm text-gray-600 mb-4">{recipe.category}</p>
                <div className="flex justify-between">
                  <Link to={`/edit/${recipe.id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-400 text-white py-1 px-4 rounded-md">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(recipe.id)}
                    className="bg-red-500 hover:bg-red-400 text-white py-1 px-4 rounded-md"
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Belum ada resep tersimpan.</p>
      )}
    </div>
  );
};

export default Home;
