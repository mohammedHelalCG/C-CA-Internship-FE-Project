import { Injectable } from '@angular/core';
import { Meal } from '../models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  /**
   * Creates a meal using the submitted form data.
   * Replace the temporary implementation with the backend API call
   * when the meal endpoint is available.
   */
  createMeal(meal: Meal): void {
    console.log('Create meal:', meal);
  }

  /**
   * Updates an existing meal using its identifier.
   * Replace the temporary implementation with the backend API call
   * when the meal endpoint is available.
   */
  updateMeal(id: number, meal: Meal): void {
    console.log('Update meal:', id, meal);
  }
}