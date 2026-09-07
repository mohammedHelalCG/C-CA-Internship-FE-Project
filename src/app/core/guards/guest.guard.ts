import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
    const router = inject(Router);

    const token = localStorage.getItem('token');

    if (token) {
        router.navigate(['/meal-list']);
    }

    return true;
};