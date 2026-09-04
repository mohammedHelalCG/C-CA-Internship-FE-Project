import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get token(): string | null {
    return localStorage.getItem('token');
  }

  set _token(token: string | null) {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}