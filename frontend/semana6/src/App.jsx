import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Equipe from "./pages/Equipe";
import Filmes from "./pages/Filmes";
import NotFound from "./pages/404";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-[#001830] text-white flex gap-6 p-4 text-lg font-semibold justify-center">
        <Link to="/">Equipe</Link>
        <Link to="/filmes">Filmes</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Equipe />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}
