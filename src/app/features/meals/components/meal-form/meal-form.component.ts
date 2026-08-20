import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

import { MealService } from '../../services/meal.service';
import { Meal } from '../../models/meal.model';

@Component({
  selector: 'app-meal-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    TextareaModule,
    ButtonModule
  ],
  templateUrl: './meal-form.component.html',
  styleUrl: './meal-form.component.css'
})
export class MealFormComponent {

  private readonly fb = inject(FormBuilder);
  private readonly mealService = inject(MealService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly categories = [
    'Breakfast',
    'Main Course',
    'Dessert',
    'Beverage'
  ];

  readonly mealForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description: ['', Validators.required]
  });

  readonly isEditMode = this.route.snapshot.paramMap.has('id');

  onSubmit(): void {
    if (this.mealForm.invalid) {
      this.mealForm.markAllAsTouched();
      return;
    }

    const meal: Meal = this.mealForm.getRawValue();

    if (this.isEditMode) {
      const id = Number(this.route.snapshot.paramMap.get('id'));

      this.mealService.updateMeal(id, meal);
    } else {
      this.mealService.createMeal(meal);
    }

    this.router.navigate(['/meals']);
  }
}