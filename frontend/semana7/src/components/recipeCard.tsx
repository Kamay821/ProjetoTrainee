import type { Recipe } from "../types/Recipe";
import { Trash } from "lucide-react";

interface Props {
  recipe: Recipe;
  onRemove: () => void;
}

export default function RecipeCard({ recipe, onRemove }: Props) {
  return (
    <div className="bg-orange-500 text-white p-4 rounded-2xl w-72 flex flex-col justify-between">
      <h3 className="font-bold text-lg">{recipe.name}</h3>
      <p className="text-sm">{recipe.ingredients}</p>
      <p className="text-sm mt-1">{recipe.time}</p>
      <p className="italic text-sm mt-1">Tipo: {recipe.type}</p>
      <button onClick={onRemove} className="mt-2 self-end">
        <Trash size={18} />
      </button>
    </div>
  );
}