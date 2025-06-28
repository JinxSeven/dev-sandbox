import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from './api.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const apiServe = inject(ApiService);
    const router = inject(Router);
    return true;
    // if (authRes) {
        // return true;
    // } else {
    //     router.navigate(['/login']);
    //     return false;
    // }
};
