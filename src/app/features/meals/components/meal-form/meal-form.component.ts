import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

import { Meal } from '../../models/meal.model';
import { MealService } from '../../services/meal.service';

@Component({
  selector: 'app-meal-form',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    TextareaModule,
    ButtonModule
  ],
  templateUrl: './meal-form.component.html',
  styleUrl: './meal-form.component.css'
})
export class MealFormComponent implements OnInit {

  isEditMode = false;
  mealId!: number;

  categories = [
    'Breakfast',
    'Main Course',
    'Dessert',
    'Beverage'
  ];

  meal: Meal = {
    id: 0,
    name: '',
    category: '',
    price: 0,
    description: '',
    image: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealService: MealService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.mealId = Number(id);

      const existingMeal = this.mealService.getMealById(this.mealId);

      if (existingMeal) {
        this.meal = { ...existingMeal };
      }
    }
  }

  saveMeal(): void {
    if (this.isEditMode) {
      this.mealService.updateMeal(this.meal);
    } else {
      this.meal.id = Date.now();
      this.mealService.createMeal(this.meal);
    }

    this.router.navigate(['/meals']);
  }
}