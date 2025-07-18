import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilmeLista from "../components/FilmeLista";

export default function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [ratings, setRatings] = useState({});
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const handleSearch = async () => {
    if (search.trim() === "") return;

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
      const data = await res.json();

      if (data.Response === "True") {
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const resDetails = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
            const details = await resDetails.json();
            return {
              ...movie,
              Genre: details.Genre || "Desconhecido",
              RottenTomatoes: details.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value || "N/A",
            };
          })
        );
        setResults(detailedMovies);
      } else {
        alert("Filme não encontrado!");
        setResults([]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleRate = (id, value) => {
    setRatings(prev => ({ ...prev, [id]: value }));
  };

  const handleRemove = (id) => {
    setResults(prev => prev.filter(movie => movie.imdbID !== id));
  };

  return (
    <div>
      <Header />

      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">🎬 Lista de Filmes</h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Nome do filme..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-orange-500 rounded-full px-4 py-2 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white font-bold rounded-full px-6 py-2"
          >
            Pesquisar
          </button>
        </div>

        <FilmeLista filmes={results} ratings={ratings} onRate={handleRate} onRemove={handleRemove} />
      </main>

      <Footer />
    </div>
  );
}