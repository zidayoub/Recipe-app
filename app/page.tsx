"use client";

import { RecipeCard } from "@/components/RecipeCard";
import { RecipeModal } from "@/components/RecipeModal";
import { getCategories, getMealsByCategory, getRandomMeals } from "@/lib/api";
import { Category, Recipe } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories();
      const meals = searchParams.get('category')
        ? await getMealsByCategory(searchParams.get('category')!)
        : await getRandomMeals();

      setCategories(categories);
      setRecipes(meals.map((meal) => ({
        ...meal,
        category: searchParams.get('category') || 'Beef',
      }))
      );
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="container px-4 py-6">
      <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 md:mx-0 items-center">
        {categories.map((category) => (
          <Link
            key={category.idCategory}
            href={`/?category=${category.strCategory}`}
            className={`
                inline-flex shrink-0 items-center justify-center rounded-full border border-primary 
                px-3 md:px-4 py-1.5 md:py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground
                ${searchParams.get('category') === category.strCategory ? 'bg-primary text-primary-foreground' : ''}
                ${!searchParams.get('category') && category.strCategory === categories[0].strCategory ? 'bg-primary text-primary-foreground' : ''}
              `}
          >
            {category.strCategory}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-10 pt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onViewRecipe={() => {
              setSelectedRecipe(recipe);
            }}
          />
        ))}
      </div>
      <RecipeModal
        recipeId={selectedRecipe?.idMeal}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  )
}