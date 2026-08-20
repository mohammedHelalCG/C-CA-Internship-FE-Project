import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'meals',
    loadChildren: () =>
      import('./features/meals/meals.routes').then(
        (m) => m.MEALS_ROUTES
      )
  }
];