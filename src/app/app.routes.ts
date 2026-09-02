import { Routes } from '@angular/router';
import { Login } from './features/login/components/login/login.component';


export const routes: Routes = [
  {
    path: 'login',
    component: Login
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