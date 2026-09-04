import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/components/login/login.component';

import { SignupComponent } from './features/signup/components/signup.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/components/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/signup/components/signup.component').then((c) => c.SignupComponent),
  },
  {
    path: 'meal-list',
    loadChildren: () => import('./features/meals/meals.routes').then((m) => m.MEALS_ROUTES),
  },

  {
    path: '',
    redirectTo: 'meal-list',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'meals',
  },
];
