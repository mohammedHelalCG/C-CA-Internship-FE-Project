export interface Meal {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  available: boolean; // Will be modified and changed to STOCK later on
  image?: string;
}