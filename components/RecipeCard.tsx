import { Recipe } from "@/types";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface RecipeCardProps {
    recipe: Recipe;
    onViewRecipe: (id: string) => void;
}

export function RecipeCard({ recipe, onViewRecipe }: RecipeCardProps) {
    const [isLiked, setIsLiked] = useState(false);

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isLiked) {
            await fetch(`/api/favorites?id=${recipe.idMeal}`, {
                method: 'DELETE',
            });
            console.log('deleted')
        } else {
            await fetch('/api/favorites', {
                method: 'POST',
                body: JSON.stringify(recipe),
            });
            console.log('added')
        }

        setIsLiked(!isLiked);
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
                        aria-label={isLiked ? "Unlike recipe" : "Like recipe"}
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors ${isLiked
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