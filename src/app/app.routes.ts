import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard'

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/login/components/login/login.component')
        .then(c => c.LoginComponent)
  },
  {
    path: 'signup',
    canActivate: [guestGuard],
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
    path: 'todays-menu',
    loadComponent: () =>
      import('./features/todays-menu/components/create-menu.component').then((c) => c.CreateMenuComponent),
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
