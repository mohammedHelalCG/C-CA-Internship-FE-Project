import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/components/login/login.component')
        .then(c => c.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/signup/components/signup.component')
        .then(c => c.SignupComponent)
  },
  {
    path: 'meal-list',
    canActivate: [authGuard],
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
