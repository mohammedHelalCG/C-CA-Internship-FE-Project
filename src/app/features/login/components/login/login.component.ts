import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  private loginService = inject(LoginService);


  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required])
  })



  onlogin() {
    if (this.loginForm.valid) {
      const isAuthenticated = this.loginService.authenticate(this.loginForm.value.email, this.loginForm.value.password);
      if (isAuthenticated) {
        console.log('Login successful');
      } else {
        console.log('Invalid credentials');
      }
      return;
    }
    console.log('Form is invalid');
  }


}