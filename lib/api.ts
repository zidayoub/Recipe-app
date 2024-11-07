import { CategoryResponse, MealResponse } from '@/types';

export async function getCategories(): Promise<CategoryResponse[]> {
  const response = await fetch('/api/recipes/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  return data.categories;
}

export async function getMealsByCategory(
  category: string
): Promise<MealResponse[]> {
  const response = await fetch(
    `/api/recipes/by-category?category=${encodeURIComponent(category)}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }
  const data = await response.json();
  return data.meals;
}

export async function getRandomMeals(): Promise<MealResponse[]> {
  const response = await fetch('/api/recipes/random');
  if (!response.ok) {
    throw new Error('Failed to fetch random meals');
  }
  const data = await response.json();
  return data.meals;
}
