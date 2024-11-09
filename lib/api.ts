import { Category, Recipe, RecipeDetails } from '@/types';

export async function getCategories(): Promise<Category[]> {
  const response = await fetch('/api/recipes/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  return data.categories;
}

export async function getMealsByCategory(category: string): Promise<Recipe[]> {
  const response = await fetch(`/api/recipes/by-category?category=${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }
  const data = await response.json();
  return data.meals;
}

export async function getRandomMeals(): Promise<Recipe[]> {
  const response = await fetch('/api/recipes/random');
  if (!response.ok) {
    throw new Error('Failed to fetch random meals');
  }
  const data = await response.json();
  return data.meals;
}

export async function getRecipeById(id: string): Promise<RecipeDetails> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();

  if (!data.meals?.[0]) {
    throw new Error('Recipe not found');
  }

  const meal = data.meals[0];

  // Get all ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || '',
      });
    }
  }

  return {
    ...meal,
    ingredients: ingredients,
  };
}
