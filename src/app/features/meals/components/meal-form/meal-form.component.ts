import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button'; // added for button module


import { Meal } from '../../Interfaces/meal.interface';
import { MealService } from '../../services/meal.service';
import { validate } from '@angular/forms/signals';
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
    
  ],
  providers: [MessageService],
  templateUrl: './meal-form.component.html',
  styleUrl: './meal-form.component.css',
})
export class MealFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  isEditMode = false;
  mealId!: number;

  image? = '';
  imageName = '';
  imageMeta = '';

  categories = ['Appetizer', 'Main Course'];

  mealForm = this.fb.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(1)]],
    description: [''],
    calories: [null],
    protein: [null],
    carbs: [null],
    fat: [null],
    vegetarian: [false],
    vegan: [false],
    glutenFree: [false],
    dairyFree: [false],
    allergenNuts: [false],
    allergenDairy: [false],
    allergenFish: [false],
    allergenGluten: [false],
    allergenSoy: [false],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealService: MealService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // if (id) {
    //   this.isEditMode = true;
    //   this.mealId = Number(id);

    //   const existingMeal = this.mealService.getMealById(this.mealId);

    //   if (existingMeal) {
    //     this.mealForm.patchValue(existingMeal);
    //     this.image = existingMeal.image;
    //   }
    // }
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
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  private formatSize(bytes: number): string {
    if (bytes >= 1048576) {
      return (bytes / 1048576).toFixed(1) + ' MB';
    }
    return Math.round(bytes / 1024) + ' KB';
  }

  cancel(): void {
    this.router.navigate(['/meals']);
  }

  saveMeal(): void {
    if (this.mealForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Missing required fields',
        detail: 'Please fill all fields marked with * before saving.',
      });
      return;
    }

    /* plain fb.group controls are nullable, so map to the
       non-null Meal fields explicitly *    
       *NOTICE* This will be removed 
       when Either the API is delivered from the backend or we simulate it into meal service*/

    const v = this.mealForm.getRawValue();

    const meal: Meal = {
      id: this.isEditMode ? this.mealId : Date.now(),
      image: this.image,
      name: v.name ?? '',
      category: v.category ?? '',
      price: Number(v.price),
      description: v.description ?? '',
      calories: v.calories,
      protein: v.protein,
      carbs: v.carbs,
      fat: v.fat,
      vegetarian: v.vegetarian ?? false,
      vegan: v.vegan ?? false,
      glutenFree: v.glutenFree ?? false,
      dairyFree: v.dairyFree ?? false,
      allergenNuts: v.allergenNuts ?? false,
      allergenDairy: v.allergenDairy ?? false,
      allergenFish: v.allergenFish ?? false,
      allergenGluten: v.allergenGluten ?? false,
      allergenSoy: v.allergenSoy ?? false,
    };

    if (this.isEditMode) {
      this.mealService.updateMeal(meal);
    } else {
      this.mealService.createMeal(meal);
    }

    this.router.navigate(['/meals']);
  }
}
