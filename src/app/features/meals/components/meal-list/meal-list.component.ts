import { Component, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Meal } from '../../Interfaces/meal.interface';
import { MealService } from '../../services/meal.service';
import { Router } from '@angular/router';
import { Card } from '../../../../shared/components/card/card.component';
import { Tags } from '@shared/interfaces/tags.interface';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { catchError, finalize, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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
export class MealListComponent {
  private mealService = inject(MealService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);

  readonly isLoading = signal(true);
  readonly loadError = signal<string | null>(null);

  readonly meals = toSignal(
    this.mealService.getAllMeals().pipe(
      catchError(() => {
        this.loadError.set('Unable to load meals.');
        return of([]);
      }),
      finalize(() => this.isLoading.set(false)),
    ),
    { initialValue: [] },
  );

  selectedDietary: FilterModel | undefined;

  dietaryFilter: FilterModel[] = [
    {
      label: 'vegetarian',
      value: 1,
    },
  ];

  getMealClassification(classifications: string[] | undefined): Tags[] {
    const tagStyles: Record<string, string> = {
      vegetarian: 'green',
      vegan: 'yellow',
      glutenFree: 'blue',
      dairyFree: 'red',
    };

    return (classifications ?? [])
      .filter((classification) => classification in tagStyles)
      .map((classification) => ({
        name: classification,
        color: tagStyles[classification],
      }));
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
    // this.mealService.deleteMeal(meal.id);
    // this.meals = this.meals.filter((m) => m.id !== meal.id);
  }

  navToCreate(): void {
    this.router.navigate(['meal-list/create']);
  }

  viewDetails(mealId: number): void {
    this.router.navigate(['meal-list/details', mealId]);
  }
}
