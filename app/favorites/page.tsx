"use client";

import { RecipeCard } from "@/components/RecipeCard";
import { RecipeModal } from "@/components/RecipeModal";
import { Recipe } from "@/types";
import { useEffect, useState } from "react";

export default function Favorites() {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    return (
        <div className="container px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">My Favorite Recipes</h1>

            {favorites.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">You haven&apos;t added any favorites yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {favorites.map((recipe) => (
                        <RecipeCard
                            key={recipe.idMeal}
                            recipe={recipe}
                            onViewRecipe={() => {
                                setSelectedRecipe(recipe);
                            }}
                        />
                    ))}
                </div>
            )}

            <RecipeModal
                recipeId={selectedRecipe?.idMeal}
                isOpen={!!selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
            />
        </div>
    );
}
