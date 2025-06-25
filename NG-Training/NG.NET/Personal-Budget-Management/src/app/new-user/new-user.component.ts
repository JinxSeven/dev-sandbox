import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { UserDash } from '../interfaces/user-dash';
import { Router } from '@angular/router';
import { NewUserData } from '../interfaces/post-data';


@Component({
    selector: 'app-new-user',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './new-user.component.html',
    styleUrl: './new-user.component.css',
})
export class NewUserComponent {
    errorOut: string = "‎";

    constructor(
        private userService: UserService,
        private apiService: UserService,
        private route: Router
    ) {}

    onRegister(regForm: NgForm) {
        const postData: NewUserData = {
            name: regForm.controls['username'].value,
            email: regForm.controls['email'].value,
            password: regForm.controls['password'].value
        };
        const exitCode = this.userService.postUserData(postData);

        if (exitCode < 0) {
            this.errorOut = "Email already in use!";
        } else if (exitCode == 1) {
            console.log("POST request failed!");
            return;
        }

        regForm.reset();
        this.errorOut = "Redirecting to login...";
        setTimeout(() => {
            this.route.navigate(["/"]);
        }, 1500);
    }
}
