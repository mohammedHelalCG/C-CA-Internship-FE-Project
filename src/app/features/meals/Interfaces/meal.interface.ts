export interface Meal {
  id: number;
  name: string;
  category: string;
  price: number | null;
  description: string;
  image: string;
  stock: number | null;

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