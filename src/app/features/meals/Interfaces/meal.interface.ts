export interface Meal {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl?: string;

  dietaryClassification?: DIETARY_CLASSIFICATION;

  // nutrition (Figma: Nutritional Breakdown)
  calories?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fat?: number | null;

  // allergen triggers
  allergenNuts?: boolean;
  allergenDairy?: boolean;
  allergenFish?: boolean;
  allergenGluten?: boolean;
  allergenSoy?: boolean;
}

export enum DIETARY_CLASSIFICATION {
  // dietary classifications
  vegetarian = 1,
  vegan = 2,
  glutenFree = 3,
  dairyFree = 4,
}
