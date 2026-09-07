import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@shared/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private baseUrl = 'https://c-ca-internship-backend-project-production.up.railway.app';

  private apiUrl = '/auth/signup';

  private http = inject(HttpClient)

  register(user: User): Observable<any> {
    return this.http.post(this.baseUrl + this.apiUrl, user)
  }
}
