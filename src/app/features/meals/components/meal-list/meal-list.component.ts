import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Meal } from '../../Interfaces/meal.interface';
import { MealService } from '../../services/meal.service';
import {HeaderComponent} from "../../../../shared/components/header/header.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-list',
  imports: [CommonModule, TableModule, ButtonModule, ConfirmDialogModule, HeaderComponent],
  providers: [ConfirmationService],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css'
})
export class MealListComponent implements OnInit {
  private mealService = inject(MealService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);

  meals: Meal[] = [];

  ngOnInit(): void {
    this.meals = this.mealService.getMeals();
  }

  confirmDelete(meal: Meal): void {
    this.confirmationService.confirm({
      header: 'Confirm delete',
      message: `Delete "${meal.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteMeal(meal)
    });
  }

  private deleteMeal(meal: Meal): void {
    this.mealService.deleteMeal(meal.id);
    this.meals = this.meals.filter(m => m.id !== meal.id);
  }

  navToCreate(): void{


    this.router.navigate(['/meals/create'])
}
}
