import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../interfaces/user';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
    standalone: true,
    selector: 'app-register',
    imports: [FormsModule, RouterModule, Toast],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    providers: [MessageService]
})
export class RegisterComponent {
    apiCalls = inject(ApiService);

    constructor(private messageService: MessageService) { }

    onRegister(registerForm: NgForm) {
        console.log(registerForm);
        const postData: User = {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            username: registerForm.controls['usrname'].value,
            email: registerForm.controls['email'].value,
            password: registerForm.controls['pass'].value,
            isAdmin: false
        };
        console.log(postData);
        this.apiCalls.addNewUser(postData).subscribe({
            next: response => {
                console.log('POST request successful', response);
                this.showToast(
                    `success`,
                    `Welcome Aboard!`,
                    `The new account is now ready to be used`
                );
            },
            error: error => {
                if (error.status === 400 && error.error.message.includes('UNIQUE constraint')) {
                    console.error('Error: ', error);
                } else {
                    console.error('Error in POST request', error);
                }
                this.showToast(
                    `error`,
                    `Oops!`,
                    `500... The server is experiencing an existential crisis`
                );
            }
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
