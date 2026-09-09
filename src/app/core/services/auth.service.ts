import { Injectable } from '@angular/core';
import { User } from '@shared/interfaces/user.interface';
import { jwtDecode } from 'jwt-decode';


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

  decodeToken(encodedToken: string) {
    const token = encodedToken;
    const decodedToken = jwtDecode(token);
    localStorage.setItem('decodedtoken', JSON.stringify(decodedToken));

  }

  get decodedtoken(): User | null {
    const val = localStorage.getItem('decodedtoken');
    const parsedVal = JSON.parse(val!);
    return parsedVal;
  }

}
