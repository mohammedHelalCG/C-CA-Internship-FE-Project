export interface Meal {
  id?: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: File;
}