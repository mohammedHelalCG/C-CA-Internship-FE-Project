import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DIETARY_CLASSIFICATION, Meal } from '../../Interfaces/meal.interface';
import { MealService } from '../../services/meal.service';
import { Router } from '@angular/router';
import { Card } from '../../../../shared/components/card/card.component';
import { Tags } from '@shared/interfaces/tags.interface';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface FilterModel {
  label: string;
  value: number;
}

@Component({
  selector: 'app-meal-list',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    Card,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    SelectModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})
export class MealListComponent implements OnInit {
  private mealService = inject(MealService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);

  meals: Meal[] = [];

  selectedDietary: FilterModel | undefined;

  dietaryFilter: FilterModel[] = [
    {
      label: 'vegetarian',
      value: 1,
    },
  ];

  ngOnInit(): void {
    this.mealService.getAllMeals().subscribe((meals) => {
      this.meals = meals;
    });
  }
  getMealClassification(dc: number | undefined): Tags[] {
    switch (dc) {
      case 1:
        // 'vegetarian'
        return [
          {
            name: DIETARY_CLASSIFICATION[1],
            color: 'green',
          },
        ];
        break;
      case 2:
        // 'vegan'
        return [
          {
            name: DIETARY_CLASSIFICATION[2],
            color: 'yellow',
          },
        ];
        break;
      case 3:
        // 'glutenFree'
        return [
          {
            name: DIETARY_CLASSIFICATION[3],
            color: 'blue',
          },
        ];
        break;
      case 4:
        // 'dairyFree'
        return [
          {
            name: DIETARY_CLASSIFICATION[4],
            color: 'red',
          },
        ];
        break;
      default:
        return [
          {
            name: DIETARY_CLASSIFICATION[1],
            color: 'green',
          },
        ];
    }
  }

  confirmDelete(meal: Meal): void {
    this.confirmationService.confirm({
      header: 'Confirm delete',
      message: `Delete "${meal.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteMeal(meal),
    });
  }

  private deleteMeal(meal: Meal): void {
    this.mealService.deleteMeal(meal.id);
    this.meals = this.meals.filter((m) => m.id !== meal.id);
  }

  navToCreate(): void {
    this.router.navigate(['meal-list/create']);
  }
}
