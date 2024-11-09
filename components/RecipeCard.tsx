import { Recipe } from "@/types";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface RecipeCardProps {
    recipe: Recipe;
    onViewRecipe: (id: string) => void;
    isLiked: boolean;
}

export function RecipeCard({ recipe, onViewRecipe, isLiked }: RecipeCardProps) {
    const [liked, setLiked] = useState(isLiked);
    const toggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (liked) {
            await fetch(`/api/favorites?id=${recipe.idMeal}`, {
                method: 'DELETE',
            });
        } else {
            await fetch('/api/favorites', {
                method: 'POST',
                body: JSON.stringify(recipe),
            });
        }

        setLiked(!liked);
    };

    return (
        <div
            className="group relative cursor-pointer"
            onClick={() => onViewRecipe(recipe.idMeal)}
        >
            <div className="aspect-square overflow-hidden rounded-[60px] bg-gray-100">
                <Image
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <div className="mt-4">
                <div className="flex items-center">
                    <span className="text-sm text-gray-500">
                        {recipe.category}
                    </span>
                    <button
                        className="ml-2 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                        onClick={toggleFavorite}
                        aria-label={liked ? "Unlike recipe" : "Like recipe"}
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors ${liked
                                ? "fill-red-500 stroke-red-500"
                                : "stroke-gray-600"
                                }`}
                        />
                        <span className="sr-only">Add to favorites</span>
                    </button>
                </div>
                <h3 className="font-medium">{recipe.strMeal}</h3>
            </div>
        </div>
    );
} 