const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(express.json());

// Endpoint untuk mendapatkan data
app.get("/recipes", (req, res) => {
  fs.readFile("recipes.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading JSON file");
      return;
    }
    res.send(JSON.parse(data));
  });
});

// Endpoint untuk menambahkan data
app.post("/recipes", (req, res) => {
  const newRecipe = req.body;

  fs.readFile("recipes.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading JSON file");
      return;
    }

    const recipes = JSON.parse(data);
    recipes.push(newRecipe);

    fs.writeFile("recipes.json", JSON.stringify(recipes, null, 2), (err) => {
      if (err) {
        res.status(500).send("Error writing JSON file");
        return;
      }
      res.status(200).send("Recipe added successfully");
    });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
