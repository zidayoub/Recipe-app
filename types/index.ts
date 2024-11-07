// API Response Types
export interface CategoryResponse {
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealResponse {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strInstructions: string;
  strTags: string;
  strIngredients: string[];
  strMeasure: string[];
}

// Application Types
export interface Category {
  id: string;
  label: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  image: string;
  tags: string;
  youtube?: string;
  source?: string;
  ingredients: string[];
  measurements: string[];
}

export interface HomePageData {
  categories: Category[];
  recipes: Recipe[];
}
