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
    {
      email: 'Welo@capgemini.com',
      password: 'password',
    },
  ];
  // authenticate(user: User): Observable<any> {
  //   return this.http.post(this.baseUrl + this.apiUrl, user);
  // }

  authenticate(user: User): boolean {
    return this.users.some(
      u => u.email === user.email && u.password === user.password
    );
  }
}