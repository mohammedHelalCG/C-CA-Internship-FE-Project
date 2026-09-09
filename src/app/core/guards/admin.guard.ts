import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { User } from '@shared/interfaces/user.interface';

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const user = authService.decodedtoken;
    if (user && user.role != "ADMIN") {
        router.navigate([''])
    }


    //   const token = localStorage.getItem('token');

    //   User decodedtoken = 

    //   if (decodedtoken) {
    //     router.navigate(['/login']);
    //   }

    return true;
};