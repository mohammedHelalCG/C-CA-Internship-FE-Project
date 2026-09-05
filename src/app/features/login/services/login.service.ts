import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@shared/interfaces/user.interface';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'https://c-ca-internship-backend-project-production.up.railway.app/';
  private apiUrl = 'login';

  private http = inject(HttpClient)
  private messageService = inject(MessageService)
  private authService = inject(AuthService)
  private router = inject(Router)
  private users = [
    { email: 'Welo@capgemini.com', password: 'password' },
    { email: 'Helal@capgemini.com', password: 'password' },
    { email: 'Najwa@capgemini.com', password: 'password' },

  ];
  // authenticate(user: User): Observable<any> {
  //   return this.http.post(this.baseUrl + this.apiUrl, user);
  // }
  authenticate(email: string, password: string): boolean {
    const user = this.users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Invalid email or password.',
      });

      return false;
    }
    this.authService._token = 'mock-token';
    this.messageService.add({
      severity: 'success',
      summary: 'Login Successful',
      detail: 'Welcome back to CapMeals.',
    });
    this.router.navigate(['/meal-list']);


    return true;
  }
}
