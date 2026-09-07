import { Component, computed, inject, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Meal } from '@features/meals/Interfaces/meal.interface';
import { Tags } from '@shared/interfaces/tags.interface';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-meal-details',
  imports: [TagModule],
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.css',
})
export class MealDetails {
  private activatedRoute = inject(ActivatedRoute);

  meal?: Meal;

  constructor() {
    this.meal = this.activatedRoute.snapshot.data['mealResolver'];
  }

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
}
