import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LoginData } from '../interfaces/post-data';
import { ApicallsService } from '../services/apicalls.service';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
    errorOut: string = "‎";

    constructor (
        private userService: UserService,
        private apiCalls: ApicallsService,
        private route: Router
    ) {}

    onLogin(loginForm: NgForm) {
        const postData: LoginData = {
            email: loginForm.controls["email"].value,
            password: loginForm.controls["password"].value
        };

        this.userService.validateLoggingUser(postData).subscribe(result => {
            if (result === -1) {
                this.errorOut = "Invalid email or password!";
            } else if (result === 1) {
                this.errorOut = "An error occurred. Please try again!";
            } else {
                this.apiCalls.getUserDetails(this.userService.getLoggedUserId()).subscribe({
                    next: (data) => {
                        console.log('Fetched user details:', data[0]);
                        this.userService.setUserDetails(data[0])
                    },
                    error: (error) => {
                        console.error('Error fetching user details:', error);
                    }
                });
                alert("Login successful!");
                this.route.navigate(['/dashboard']);
            }
        });
    }

}
