import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private messageService = inject(MessageService);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  onlogin() {
    if (this.loginForm.valid) {
      const isAuthenticated = this.loginService.authenticate(this.loginForm.value.email, this.loginForm.value.password);
      // if (isAuthenticated) {
      //   this.messageService.add({
      //     severity: 'success',
      //     summary: 'Login successful',
      //     detail: 'Welcome back to CapMeals.',
      //   });
      // } else {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Invalid credentials',
      //     detail: 'The email or password you entered is incorrect.',
      //   });
      // }
      return;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Invalid credentials',
      detail: 'The email or password you entered is incorrect.',
    });
  }


}