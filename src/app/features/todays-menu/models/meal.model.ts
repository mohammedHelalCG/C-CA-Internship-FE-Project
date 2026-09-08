export type Category = 'APPETIZER' | 'MAIN_COURSE';

export type DietaryClassification = 'VEGETARIAN' | 'VEGAN' | 'GLUTEN_FREE' | 'DAIRY_FREE';

export type AllergenTrigger = 'NUTS' | 'DAIRY' | 'FISH' | 'GLUTEN' | 'SOY';

export interface Meal {
  id: number;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: Category;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  dietaryClassification?: DietaryClassification;
  allergenTriggers?: AllergenTrigger[];
}

export interface CreateMealRequest {
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: Category;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  dietaryClassification?: DietaryClassification;
  allergenTriggers?: AllergenTrigger[];
}
