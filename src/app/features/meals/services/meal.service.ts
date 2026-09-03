import { Injectable } from '@angular/core';
import { Meal } from '../Interfaces/meal.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private baseUrl = 'https://c-ca-internship-backend-project-production.up.railway.app/';
  private apiUrl = 'meals';
  constructor(private http: HttpClient) { }

  getAllMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.baseUrl + this.apiUrl);
  }

  getMealById(id: number): Observable<Meal> {
    return this.http.get<Meal>(this.baseUrl + this.apiUrl + id);
  }

  createMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.baseUrl + this.apiUrl, meal);
  }

  updateMeal(id: number, updatedMeal: Meal): Observable<Meal> {
    return this.http.put<Meal>(this.baseUrl + this.apiUrl, updatedMeal);
  }

  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + this.apiUrl + id);
  }
}
