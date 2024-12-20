import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe"; // Tambahkan import untuk halaman AddRecipe

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddRecipe />} /> {/* Rute ke halaman tambah resep */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
