import { Injectable } from '@angular/core';
import { Meal } from '../Interfaces/meal.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private apiUrl = 'http://localhost:8080/meals';
  constructor(private http: HttpClient) {}

  private meals: Meal[] = [
    {
      id: 1,
      name: 'Chicken Burger',
      category: 'Main Course',
      price: 350,
      description: 'Chicken burger with cheese',
      image: '',
      dietaryClassification: 1,
    },
    {
      id: 2,
      name: 'Pasta Alfredo',
      category: 'Main Course',
      price: 500,
      description: 'Pasta white sauce',
      image: '',
      dietaryClassification: 2,
    },
    {
      id: 3,
      name: 'Salad',
      category: 'Appetizer',
      price: 190,
      description: 'caesar salad',
      image: '',
      dietaryClassification: 3,
    },
    {
      id: 4,
      name: 'Fries',
      category: 'Appetizer',
      price: 120,
      description: 'French fries with a side of a dip',
      image: '',
      dietaryClassification: 4,
    },
  ];

  getAllMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.apiUrl);
  }

  getMealById(id: number): Observable<Meal> {
    return this.http.get<Meal>(`${this.apiUrl}/${id}`);
  }

  createMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.apiUrl, meal);
  }

  updateMeal(id: number, updatedMeal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiUrl}/${id}`, updatedMeal);
  }

  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
