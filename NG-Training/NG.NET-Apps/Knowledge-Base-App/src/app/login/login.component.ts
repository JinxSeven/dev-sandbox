import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-login',
    imports: [FormsModule, RouterModule, ToastModule, Toast, ButtonModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [MessageService],
})
export class LoginComponent {
    apiCalls = inject(ApiService);
    constructor(
        private router: Router,
        private messageService: MessageService
    ) {}

    onLogin(loginForm: NgForm) {
        const username = loginForm.controls['usrname'].value;
        const password = loginForm.controls['pass'].value;
        this.apiCalls.LoggingUser(username, password).subscribe({
            next: (response: any) => {
                if (response) {
                    // alert('Login successful!');
                    // this.apiCalls.setAuthenticated(true);
                    sessionStorage.setItem(
                        'LoggedUser',
                        JSON.stringify(response)
                    );
                    this.showToast(
                        `success`,
                        `Welcome Back!`,
                        `We and your tasks missed you!`
                    );
                    setTimeout(() => {
                        this.router.navigate(['/tasktracker']);
                    }, 2350);
                }
            },
            error: (error: HttpErrorResponse) => {
                if (error.status === 400) {
                    // alert('Invalid username or password!');
                    this.showToast(
                        `warn`,
                        `Incorrect Creds!`,
                        `Maybe your cat walked on the keyboard?`
                    );
                } else if (error.status === 500) {
                    // alert('Internal server error: ' + error.error);
                    this.showToast(
                        `error`,
                        `Oops!`,
                        `500... The server is experiencing an existential crisis`
                    );
                } else {
                    // alert('An unexpected error occurred!');
                    this.showToast(
                        'error',
                        'Oops!',
                        'The server is taking a coffee break. Try again in a bit!'
                    );
                }
            },
        });
    }

    showToast(severity: string, summary: string, detail: string) {
        this.messageService.add({
            severity: `${severity}`,
            summary: `${summary}`,
            detail: `${detail}`,
            life: 2000,
        });
    }
}
