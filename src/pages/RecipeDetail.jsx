import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Swal from "sweetalert2"; // Import SweetAlert2
import "sweetalert2/src/sweetalert2.scss"; // Import SweetAlert2 styles

const RecipeDetail = () => {
  const { id } = useParams();
  // State untuk menyimpan data resep
  const [recipe, setRecipe] = useState(null);
  // State untuk status loading
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fungsi untuk mengambil data resep berdasarkan ID
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

  // Fungsi untuk menghapus resep
  const handleDelete = async () => {
    // Ensure id is correctly used without conflicts
    const confirmDelete = window.confirm("Yakin ingin menghapus resep?");
    if (confirmDelete) {
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
          alert("Gagal menghapus resep.");
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("Terjadi kesalahan saat menghapus resep.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!recipe) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Resep tidak ditemukan!</h2>
        <Link to="/" className="text-blue-500 hover:underline">
          Kembali ke Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{recipe.name}</h2>
      <p className="mb-2">Kategori: {recipe.category}</p>
      <h3 className="text-xl font-semibold mt-4">Bahan-Bahan:</h3>
      <ul className="list-disc ml-5">
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mt-4">Langkah-Langkah:</h3>
      <ol className="list-decimal ml-5">
        {recipe.steps?.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      {recipe.image && (
        <div className="mt-4">
          <img src={recipe.image} alt={recipe.name} className="w-full max-w-md" />
        </div>
      )}
      <div className="mt-4 flex gap-2">
        <Link to="/" className="btn btn-secondary">
          Kembali ke Home
        </Link>
        <Link to={`/edit/${id}`}>
          <Button className="btn-success">Edit Resep</Button>
        </Link>
        <Button onClick={handleDelete} className="btn-error">
          Hapus Resep
        </Button>
      </div>
    </div>
  );
};

export default RecipeDetail;
