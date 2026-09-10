export interface Meal {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  calories?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fat?: number | null;

  dietaryClassification?: string[];

  allergenTriggers?: string[];
}

// dietary classifications
export enum DIETARY_CLASSIFICATION {
  VEGETARIAN = 1,
  VEGAN = 2,
  GLUTEN_FREE = 3,
  DAIRY_FREE = 4,
}

// meal categories
export enum MEAL_CATEGORY {
  APPETIZER = 0,
  MAIN_COURSE = 1,
}

// allergen triggers
export enum ALLERGEN_TRIGGERS {
  NUTS = 0,
  DAIRY = 1,
  FISH = 2,
  GLUTEN = 3,
  SOY = 4,
}
