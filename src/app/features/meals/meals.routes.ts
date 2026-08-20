import { Routes } from '@angular/router';

export const MEALS_ROUTES: Routes = [
  {
    path: 'create',
    loadComponent: () =>
      import('./components/meal-form/meal-form.component')
        .then(m => m.MealFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/meal-form/meal-form.component')
        .then(m => m.MealFormComponent)
  }
];