import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Swal from "sweetalert2"; // Import SweetAlert2
import "sweetalert2/src/sweetalert2.scss"; // Import SweetAlert2 styles

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = await Swal.fire({
      title: "Yakin ingin menghapus resep ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/recipes/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Resep berhasil dihapus!",
          }).then(() => {
            navigate("/");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Gagal menghapus resep.",
          });
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menghapus resep.",
        });
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Sedang memuat data...</p>;
  }

  if (!recipe) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500">Resep tidak ditemukan!</h2>
        <Link to="/" className="text-blue-500 hover:underline mt-4 block">
          Kembali ke Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {recipe.name}
      </h1>
      {recipe.image && (
        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <p className="text-gray-600 text-lg font-semibold mb-6 text-center">
        Kategori: <span className="text-gray-800">{recipe.category}</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bahan-Bahan</h2>
          <ul className="list-disc list-inside text-gray-600">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index} className="mb-2">{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Langkah-Langkah</h2>
          <ol className="list-decimal list-inside text-gray-600">
            {recipe.steps?.map((step, index) => (
              <li key={index} className="mb-2">{step}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-400"
        >
          Kembali ke Home
        </Link>
        <Link
          to={`/edit/${id}`}
          className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-400"
        >
          Edit Resep
        </Link>
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-400"
        >
          Hapus Resep
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
