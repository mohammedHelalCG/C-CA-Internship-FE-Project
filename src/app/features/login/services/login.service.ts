import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'https://c-ca-internship-backend-project-production.up.railway.app/';
  private apiUrl = 'login';

  private http = inject(HttpClient)


  private users = [
    { email: 'Welo@capgemini.com', password: 'password' },
    { email: 'Helal@capgemini.com', password: 'password' },
    { email: 'Najwa@capgemini.com', password: 'password' },

  ];
  // authenticate(user: User): Observable<any> {
  //   return this.http.post(this.baseUrl + this.apiUrl, user);
  // }
  authenticate(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    return !!user;
  }
}
