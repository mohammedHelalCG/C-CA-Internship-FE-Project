import { Injectable } from '@angular/core';
import { Meal } from '../Interfaces/meal.interface';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private meals: Meal[] = [
    {
      id: 1,
      name: 'Chicken Burger',
      category: 'Main Course',
      price: 350,
      description: 'Chicken burger with cheese',
      image: '',
      stock: 25
    },
    {
      id: 2,
      name: 'Pasta Alfredo',
      category: 'Main Course',
      price: 500,
      description: 'Pasta white sauce',
      image: '',
      stock: 18
    },
    {
      id: 3,
      name: 'Salad',
      category: 'Appetizer',
      price: 190,
      description: 'caesar salad',
      image: '',
      stock: 30
    },
    {
      id: 4,
      name: 'Fries',
      category: 'Appetizer',
      price: 120,
      description: 'French fries with a side of a dip',
      image: '',
      stock: 0
    }
  ];

  getMeals(): Meal[] {
    return this.meals;
  }

  getMealById(id: number): Meal | undefined {
    return this.meals.find(meal => meal.id === id);
  }

  createMeal(meal: Meal): void {
    this.meals.push(meal);
  }

  updateMeal(updatedMeal: Meal): void {
    const index = this.meals.findIndex(
      meal => meal.id === updatedMeal.id
    );
    if (index !== -1) {
      this.meals[index] = updatedMeal;
    }
  }

  deleteMeal(id: number): void {
    this.meals = this.meals.filter(meal => meal.id !== id);
  }
}