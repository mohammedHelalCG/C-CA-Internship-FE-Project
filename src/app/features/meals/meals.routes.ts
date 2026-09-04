import { Routes } from '@angular/router';
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
];
