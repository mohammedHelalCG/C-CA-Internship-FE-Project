import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LoginService } from '../../services/login.service';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private router = inject(Router)


  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  // onlogin() {
  //   if (this.loginForm.invalid) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Invalid credentials',
  //       detail: 'The email or password you entered is incorrect.',
  //     });

  //     return;
  //   }

  //   this.loginService.authenticate(this.loginForm.value).subscribe({
  //     next: (response) => {
  //       console.log(response);

  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Login successful',
  //         detail: 'Welcome back to CapMeals.',
  //       });
  //     },

  //     error: () => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Invalid credentials',
  //         detail: 'The email or password you entered is incorrect.',
  //       });
  //     },
  //   });
  // }
  onlogin() {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid credentials',
        detail: 'Please enter a valid email and password.',
      });

      return;
    }

    this.loginService.authenticate(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

  }
}