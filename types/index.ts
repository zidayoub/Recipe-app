// Application Types
export interface Category {
  idCategory: string;
  strCategory: string;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  category?: string;
  isLiked: boolean;
}

export interface RecipeDetails {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  ingredients: {
    ingredient: string;
    measure: string;
  }[];
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}
