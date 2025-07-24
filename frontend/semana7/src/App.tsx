import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeForm from "./components/recipeForm";
import RecipeCard from "./components/recipeCard";
import type { Recipe } from "./types/Recipe";
import ConfirmDialog from "./components/confirmDialog";


const recipeTypes = ["Todos", "Entrada", "Prato Principal", "Sobremesa"] as const;

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filterType, setFilterType] = useState<typeof recipeTypes[number]>("Todos");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<number | null>(null);

  const addRecipe = (recipe: Recipe) => {
    setRecipes((prev) => [...prev, recipe]);
  };

  const askToRemove = (index: number) => {
    setRecipeToDelete(index);
    setConfirmOpen(true);
  };

  const confirmRemove = () => {
    if (recipeToDelete !== null) {
      setRecipes((prev) => prev.filter((_, i) => i !== recipeToDelete));
    }
    setConfirmOpen(false);
    setRecipeToDelete(null);
  };

  const cancelRemove = () => {
    setConfirmOpen(false);
    setRecipeToDelete(null);
  };

  const filteredRecipes =
    filterType === "Todos"
      ? recipes
      : recipes.filter((r) => r.type === filterType);

  const sortedRecipes = filteredRecipes.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return sortAsc ? -1 : 1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      <main className="flex flex-col items-center px-4 py-6">
        <RecipeForm onAdd={addRecipe} />

        {/* Controles */}
        <div className="flex gap-4 mt-8 items-center">
          <label className="font-semibold text-gray-700">Filtrar por tipo:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as typeof recipeTypes[number])}
            className="border border-orange-500 rounded-full px-4 py-2"
          >
            {recipeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="bg-orange-500 text-white rounded-full px-4 py-2 font-semibold"
          >
            Ordenar: {sortAsc ? "A-Z" : "Z-A"}
          </button>
        </div>

        {/* Lista */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {sortedRecipes.length > 0 ? (
            sortedRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                onRemove={() => askToRemove(index)} // ← novo
              />
            ))
          ) : (
            <p className="mt-6 text-gray-600">Nenhuma receita encontrada.</p>
          )}
        </div>
      </main>

      <Footer />

      <ConfirmDialog
        isOpen={confirmOpen}
        onCancel={cancelRemove}
        onConfirm={confirmRemove}
        message="Tem certeza que deseja excluir esta receita?"
      />
    </div>
  );
}