import React from "react";
import { recipes } from "../data/recipes";
import { Link } from "react-router-dom"; // Tambahkan import Link

const Home = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Daftar Resep</h2>
      <Link
        to="/add"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Tambah Resep
      </Link>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="mb-2">
            <span className="font-bold">{recipe.name}</span> - {recipe.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
