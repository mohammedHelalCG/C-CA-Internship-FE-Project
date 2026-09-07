import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { SignupService } from '../services/signup.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [Toast, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private message = inject(MessageService);
  private signupService = inject(SignupService);
  private router = inject(Router);

  signupForm: FormGroup = new FormGroup({
    fullName: new FormControl<string>('', [Validators.required]),
    ggid: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
  });

  onSignup() {
    if (this.signupForm.invalid) {
      this.message.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields',
      });
      return;
    }
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.message.add({ severity: 'error', summary: 'Error', detail: 'Passwords do not match' });
      return;
    }

    const user = {
      name: this.signupForm.value.fullName,
      employeeCode: this.signupForm.value.ggid,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    this.signupService.register(user).subscribe({
      next: () => {
        this.message.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User registered successfully',
        });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.message.add({
          severity: 'error',
          summary: 'Registration Failed',
          detail: 'Unable to create account. Please recheck your data.',
        });
      },
    });
    return;
  }
}
