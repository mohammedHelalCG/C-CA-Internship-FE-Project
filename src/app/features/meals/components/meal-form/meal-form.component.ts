import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import {
  ALLERGEN_TRIGGERS,
  DIETARY_CLASSIFICATION,
  Meal,
  MEAL_CATEGORY,
} from '../../Interfaces/meal.interface';
import { MealService } from '../../services/meal.service';
import { CheckboxModule } from 'primeng/checkbox';

type CheckboxValues = Record<string, boolean>;
@Component({
  selector: 'app-meal-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    RadioButtonModule,
    InputNumberModule,
    TextareaModule,
    ButtonModule,
    ToastModule,
    CheckboxModule,
  ],
  providers: [MessageService],
  templateUrl: './meal-form.component.html',
  styleUrl: './meal-form.component.css',
})
export class MealFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private mealService = inject(MealService);
  private messageService = inject(MessageService);

  isEditMode = signal<boolean>(false);
  mealId!: number;

  image? = '';
  imageName = '';
  imageMeta = '';

  categories = MEAL_CATEGORY;
  dietaryClassification = DIETARY_CLASSIFICATION;
  allergenTriggers = ALLERGEN_TRIGGERS;

  mealForm = this.fb.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(1)]],
    description: '',
    calories: null,
    protein: null,
    carbs: null,
    fat: null,

    dietaryClassification: this.fb.nonNullable.group({
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
    }),

    allergenTriggers: this.fb.nonNullable.group({
      allergenNuts: false,
      allergenDairy: false,
      allergenFish: false,
      allergenGluten: false,
      allergenSoy: false,
    }),
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode.set(true);
      this.mealId = Number(id);
      const existingMeal = this.mealService.getMealById(this.mealId);
      // if (existingMeal) {
      //   this.mealForm.patchValue(existingMeal);
      //   this.image = existingMeal.image;
      // }
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.readImage(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();

    const file = event.dataTransfer?.files?.[0];

    if (file && file.type.startsWith('image/')) {
      this.readImage(file);
    }
  }

  private readImage(file: File): void {
    this.imageName = file.name;
    this.imageMeta = this.formatSize(file.size);

    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  private formatSize(bytes: number): string {
    if (bytes >= 1048576) {
      return (bytes / 1048576).toFixed(1) + ' MB';
    }
    return Math.round(bytes / 1024) + ' KB';
  }

  private selectedOptions(options: CheckboxValues): string[] {
    return Object.entries(options)
      .filter(([, selected]) => selected)
      .map(([option]) => option);
  }

  cancel(): void {
    this.router.navigate(['/meal-list']);
  }

  saveMeal(): void {
    debugger;
    if (this.mealForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Missing required fields',
        detail: 'Please fill all fields marked with * before saving.',
      });
      return;
    }

    const meal: Meal = {
      // id: this.isEditMode() ? this.mealId : Date.now(),
      imageUrl: this.image,
      name: this.mealForm.value.name ?? '',
      category: this.mealForm.value.category ?? '',
      price: Number(this.mealForm.value.price),
      description: this.mealForm.value.description ?? '',
      calories: this.mealForm.value.calories,
      protein: this.mealForm.value.protein,
      carbs: this.mealForm.value.carbs,
      fat: this.mealForm.value.fat,
      // dietaryClassification: [this.mealForm.value.dietaryClassification],
      // allergenTriggers: this.selectedOptions(this.mealForm.value.allergenTriggers),
    };
    if (this.isEditMode()) {
      this.mealService.updateMeal(this.mealId, meal);
    } else {
      this.mealService.createMeal(meal).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/meal-list']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Missing required fields',
            detail: 'Please fill all fields marked with * before saving.',
          });
        },
      });
    }
  }
}
