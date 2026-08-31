import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'meal-list',
    loadChildren: () =>
      import('./features/meals/meals.routes')
        .then(m => m.MEALS_ROUTES)
  },

  {
    path: '',
    redirectTo: 'meal-list',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'meals'
  }
];