import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MealService } from '../services/meal.service';
import { Meal } from '../Interfaces/meal.interface';

export const mealResolver: ResolveFn<Meal> = (route, state) => {
  const mealService = inject(MealService);
  const mealId = Number(route.paramMap.get('id'));

  return mealService.getMealById(mealId);
};
