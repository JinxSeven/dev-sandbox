import { Component, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-header',
    imports: [
        RouterModule, CommonModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    router = inject(Router);
    apiServe = inject(ApiService);

    logout() {
        this.router.navigate(['/login']);
        // this.apiServe.setAuthenticated(false);
        sessionStorage.setItem(
            'LoggedUser',
            JSON.stringify(null));
    }

    loggedUser!: User;
    isAdmin: boolean;

    constructor() {
        this.loggedUser = this.getLoggedUser();
        this.isAdmin = this.loggedUser?.isAdmin;
    }

    getLoggedUser(): User {
        const loggedUser = sessionStorage.getItem("LoggedUser");
        return JSON.parse(loggedUser!);
    }

    navigateToDashboard() {
        if (this.isAdmin) {
            this.router.navigate(['/admindash']);
            return;
        }
        this.router.navigate(['/userdash']);
    }
}
