import { useState } from "react";
import type { Recipe } from "../types/Recipe";

interface Props {
  onAdd: (recipe: Recipe) => void;
}

const recipeTypes = ["Entrada", "Prato Principal", "Sobremesa"] as const;

export default function RecipeForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState<typeof recipeTypes[number]>("Entrada");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ingredients || !time || !type) return;
    onAdd({ name, ingredients, time, type });
    setName("");
    setIngredients("");
    setTime("");
    setType("Entrada");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-2xl"
    >
      <input
        type="text"
        placeholder="Nome da Receita"
        className="border border-orange-500 rounded-full px-4 py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ingredientes"
        className="border border-orange-500 rounded-full px-4 py-2"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tempo de Preparo"
        className="border border-orange-500 rounded-full px-4 py-2"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value as typeof recipeTypes[number])}
        className="border border-orange-500 rounded-full px-4 py-2"
      >
        {recipeTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-orange-500 text-white rounded-full py-2 font-semibold"
      >
        Adicionar
      </button>
    </form>
  );
}