import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserDetails } from '../interfaces/user-dash';
import { UserService } from '../services/user.service';
import { MainContentComponent } from './main-content/main-content.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        HeaderComponent,
        MainContentComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
    userService = inject(UserService);
    loggedId: number = this.userService.getLoggedUserId();
    loggedUserDetails: UserDetails = this.userService.getUserDetails();

    constructor() {}

    ngOnInit(): void {}
}
