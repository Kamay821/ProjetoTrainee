
export default function FilmeLista({ filmes, ratings, onRate, onRemove }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filmes.map((movie) => (
        <div key={movie.imdbID} className="bg-[#001830] text-white p-4 rounded-xl shadow-lg relative">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
            alt={movie.Title}
            className="w-full h-60 object-cover rounded-md mb-3"
          />
          <h2 className="text-xl font-bold">{movie.Title}</h2>
          <p className="text-sm">{movie.Year}</p>
          <p className="text-sm">🎭 {movie.Genre}</p>
          <p className="text-sm">🍅 {movie.RottenTomatoes}</p>

          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRate(movie.imdbID, star)}
                className={`text-xl ${ratings[movie.imdbID] >= star ? "text-yellow-400" : "text-gray-500"}`}
              >
                ★
              </button>
            ))}
          </div>

          <button
            onClick={() => onRemove(movie.imdbID)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg"
            title="Remover"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
