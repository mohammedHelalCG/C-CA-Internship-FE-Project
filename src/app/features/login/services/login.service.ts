import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'https://c-ca-internship-backend-project-production.up.railway.app';

  private apiUrl = '/auth/login';

  private http = inject(HttpClient);

  authenticate(user: User): Observable<any> {
    return this.http.post(this.baseUrl + this.apiUrl, user);
  }
}