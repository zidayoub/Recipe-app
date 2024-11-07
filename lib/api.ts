import { CategoryResponse, MealResponse } from '@/types';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function getCategories(): Promise<CategoryResponse[]> {
  const response = await fetch(`${API_BASE_URL}/categories.php`);
  const data = await response.json();
  return data.categories.slice(0, 5);
}

export async function getMealsByCategory(
  category: string
): Promise<MealResponse[]> {
  const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals;
}

export async function getRandomMeals(): Promise<MealResponse[]> {
  const response = await fetch(`${API_BASE_URL}/filter.php?c=Beef`);
  const data = await response.json();
  return data.meals?.slice(0, 10) ?? [];
}
