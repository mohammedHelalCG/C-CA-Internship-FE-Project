import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/components/login/login.component';


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/components/login/login.component').then(c => c.LoginComponent)
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