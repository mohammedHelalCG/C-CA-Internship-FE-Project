import { Routes } from '@angular/router';
import { SignupComponent } from './features/signup/components/signup.component';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () => import('./features/signup/components/signup.component').then(c => c.SignupComponent)
  },
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