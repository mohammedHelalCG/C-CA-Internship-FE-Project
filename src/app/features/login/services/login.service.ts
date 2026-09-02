import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private users = [
    { email: 'Welo@capgemini.com', password: 'password' },
    { email: 'Helal@capgemini.com', password: 'password' },
    { email: 'Najwa@capgemini.com', password: 'password' },

  ];

  authenticate(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    return !!user;
  }
}
