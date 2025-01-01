const defaultRecipes = [
  {
    id: 1,
    name: "Nasi Goreng",
    category: "Makanan Utama",
    ingredients: ["2 piring nasi", "2 butir telur", "3 sdm kecap manis", "2 siung bawang putih"],
    steps: [
      "Panaskan wajan, tumis bawang putih hingga harum.",
      "Masukkan telur, orak-arik, lalu tambahkan nasi.",
      "Tambahkan kecap manis, aduk hingga merata.",
      "Angkat dan sajikan."
    ],
    image: "https://via.placeholder.com/300x200.png?text=Nasi+Goreng",
  },
  {
    id: 2,
    name: "Agar Agar",
    category: "Camilan",
    ingredients: ["1 bungkus agar-agar", "500 ml air", "100 gram gula pasir"],
    steps: [
      "Campurkan agar-agar, air, dan gula ke dalam panci.",
      "Panaskan hingga mendidih sambil diaduk.",
      "Tuangkan ke dalam cetakan dan dinginkan.",
      "Sajikan setelah agar-agar mengeras."
    ],
    image: "https://via.placeholder.com/300x200.png?text=Agar+Agar",
  },
];

// Cek apakah ada data di Local Storage
export const recipes = JSON.parse(localStorage.getItem("recipes")) || defaultRecipes;

// Fungsi untuk menyimpan data ke Local Storage
export const saveRecipes = (newRecipes) => {
  localStorage.setItem("recipes", JSON.stringify(newRecipes));
};
