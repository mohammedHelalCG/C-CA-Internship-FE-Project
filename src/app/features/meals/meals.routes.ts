import { Routes } from '@angular/router';
export const MEALS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/meal-list/meal-list.component')
        .then(m => m.MealListComponent)
  },
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