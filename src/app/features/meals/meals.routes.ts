import { Routes } from '@angular/router';
import { mealResolver } from './resolvers/meal.resolver';
export const MEALS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/meal-list/meal-list.component').then((c) => c.MealListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/meal-form/meal-form.component').then((c) => c.MealFormComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/meal-form/meal-form.component').then((c) => c.MealFormComponent),
  },
  {
    path: 'details/:id',
    resolve: { mealResolver: mealResolver },
    loadComponent: () =>
      import('./components/meal-details/meal-details.component').then((c) => c.MealDetails),
  },
];
