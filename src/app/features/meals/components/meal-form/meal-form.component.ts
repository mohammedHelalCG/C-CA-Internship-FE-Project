import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';

import { Meal } from '../../Interfaces/meal.interface';
import { MealService } from '../../services/meal.service';

@Component({
  selector: 'app-meal-form',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    RadioButtonModule,
    InputNumberModule,
    TextareaModule
  ],
  templateUrl: './meal-form.component.html',
  styleUrl: './meal-form.component.css'
})
export class MealFormComponent implements OnInit {

  isEditMode = false;
  mealId!: number;

  imageName = '';
  imageMeta = '';

  triedToSave = false;

  get missingEssentials(): boolean {
    return (
      !this.meal.name.trim() ||
      this.meal.price === null ||
      this.meal.stock === null ||
      !this.meal.category
    );
  }

  categories = [
    'Appetizer',
    'Main Course'
  ];

  meal: Meal = {
    id: 0,
    name: '',
    category: '',
    price: null,
    description: '',
    image: '',
    stock: null,
    ingredients: '',
    calories: undefined,
    protein: undefined,
    carbs: undefined,
    fat: undefined,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    allergenNuts: false,
    allergenDairy: false,
    allergenFish: false,
    allergenGluten: false,
    allergenSoy: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealService: MealService,
    private cdr: ChangeDetectorRef
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
      this.meal.image = reader.result as string;
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
    if (this.missingEssentials) {
      this.triedToSave = true;
      return;
    }

    if (this.isEditMode) {
      this.mealService.updateMeal(this.meal);
    } else {
      this.meal.id = Date.now();
      this.mealService.createMeal(this.meal);
    }

    this.router.navigate(['/meals']);
  }
}