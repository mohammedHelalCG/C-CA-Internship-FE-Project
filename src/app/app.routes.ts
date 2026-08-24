import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'meals-list',
    loadChildren: () =>
      import('./features/meals/meals.routes')
        .then(m => m.MEALS_ROUTES)
  },

  {
    path: '',
    redirectTo: 'meals',
    pathMatch: 'full'
  }
];