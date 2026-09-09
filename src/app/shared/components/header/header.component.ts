import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { User } from '@shared/interfaces/user.interface';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  user: User | null = null;

  ngOnInit(): void {

    if (this.auth.decodedtoken) {
      this.user = this.auth.decodedtoken;
    }

  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
