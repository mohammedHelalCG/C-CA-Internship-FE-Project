import { Routes } from '@angular/router';
import { MealFormComponent } from './components/meal-form/meal-form.component';

export const MEALS_ROUTES: Routes = [
  {
    path: 'create',
    component: MealFormComponent
  },
  {
    path: ':id/edit',
    component: MealFormComponent
  }
];