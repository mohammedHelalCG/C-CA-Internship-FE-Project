import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    PasswordModule,
    FloatLabelModule,
    SplitterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class Login {
  password = '';
}