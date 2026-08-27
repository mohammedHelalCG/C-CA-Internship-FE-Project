export interface Meal {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;


  // nutrition (Figma: Nutritional Breakdown)
  calories?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fat?: number | null;

  // dietary classifications
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;

  // allergen triggers
  allergenNuts?: boolean;
  allergenDairy?: boolean;
  allergenFish?: boolean;
  allergenGluten?: boolean;
  allergenSoy?: boolean;
}