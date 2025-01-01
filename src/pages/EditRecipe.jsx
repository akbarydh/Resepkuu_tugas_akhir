import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditRecipe = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: "",
    steps: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3001/recipes/${id}`);
        const recipe = await response.json();
        setFormData({
          name: recipe.name,
          category: recipe.category,
          ingredients: recipe.ingredients.join(", "),
          steps: recipe.steps.join(". "),
          image: recipe.image,
        });
        setImagePreview(recipe.image);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        alert("Resep tidak ditemukan!");
        navigate("/");
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecipe = {
      name: formData.name,
      category: formData.category,
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      steps: formData.steps.split(".").map((item) => item.trim()),
      image: formData.image || "https://via.placeholder.com/300x200.png?text=Resep+Baru",
    };

    try {
      await fetch(`http://localhost:3001/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Resep</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        {/* ... */}
      </form>
    </div>
  );
};

export default EditRecipe;
