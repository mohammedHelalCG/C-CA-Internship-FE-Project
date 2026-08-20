import { Injectable } from '@angular/core';
import { Meal } from '../models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private meals: Meal[] = [
    {
      id: 1,
      name: 'Chicken Burger',
      category: 'Main Course',
      price: 120,
      description: 'Chicken burger with cheese',
      image: ''
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
}