import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

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
    const confirmDelete = window.confirm("Yakin ingin menghapus resep?");
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3001/recipes/${id}`, {
          method: "DELETE",
        });
        navigate("/");
      } catch (error) {
        console.error("Error deleting recipe:", error);
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
        <Link to="/" className="text-blue-500 hover:underline">
          Kembali ke Home
        </Link>
        <Link to={`/edit/${id}`} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Edit Resep
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Hapus Resep
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
