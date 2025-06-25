import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './data';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
    selector: 'app-root',
    standalone: true,
    template: ` <h1>User Listing</h1>
                @for (user of userData; track $index) {
                    <app-user-info [user]='user'/>
                } @empty {
                    <app-user-info></app-user-info>
                }
    `,
    imports: [UserInfoComponent],
})
export class AppComponent {
    userInfoService = inject(UserService);
    userData: User[] = [];

    async ngOnInit() {
        this.userData = await this.userInfoService.getUserData();
    }

    constructor() {
        this.userInfoService.getUserData()
        .then((data) => {
            this.userData = data;
        })
        .catch((error) => {
            console.error(error);
            alert('Error fetching user data');
        });
    }
}
