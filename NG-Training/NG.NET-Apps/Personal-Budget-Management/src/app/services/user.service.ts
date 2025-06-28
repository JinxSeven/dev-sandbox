import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { UserDash, UserDetails } from '../interfaces/user-dash';
import { ApicallsService } from './apicalls.service';
import { LoginData, NewUserData } from '../interfaces/post-data';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class UserService {
    constructor() {}

    apiCallsService = inject(ApicallsService);

    postUserData(postData: NewUserData): number {
        this.apiCallsService.postUserData(postData).subscribe({
            next: response => {
                console.log('POST request successful', response);
            },
            error: error => {
                if (error.status === 400 && error.error.message.includes('UNIQUE constraint')) {
                    console.error('Error: ', error);
                    return -1;
                } else {
                    console.error('Error in POST request', error);
                    return 1
                }
            }
        });
        return 0;
    }

    validateLoggingUser(postData: LoginData): Observable<number> {
        return this.apiCallsService.validateLoggingUser(postData).pipe(
            map(response => {
                console.log('Validation request successful');
                this.setLoggedUserId(response);
                return response.userId;
            }),
            catchError(error => {
                if (error.status === 400 && error.error.message.includes('UNIQUE constraint')) {
                    console.error('Error: ', error);
                    return of(-1);
                } else {
                    console.error('Error in POST request', error);
                    return of(1);
                }
            })
        );
    }

    setLoggedUserId(id: number) {
        sessionStorage.setItem("loggedUserId", JSON.stringify(id));
    }

    getLoggedUserId(): number {
        const id = sessionStorage.getItem("loggedUserId");
        return id ? JSON.parse(id) : -1;
    }

    getUserDetails(): UserDetails {
        const userDtls = localStorage.getItem("userLoginDetails");
        return JSON.parse(userDtls!);
    }

    setUserDetails(updatedUserDtls: UserDetails) {
        localStorage.setItem("userLoginDetails", JSON.stringify(updatedUserDtls));
    }

    // getUserDetails(user_id: number): Observable<any> {
    //     return this.apiCallsService.getUserDetails(user_id).pipe(
    //         map(data => data),
    //         catchError(error => {
    //             console.error('Failed to fetch user details:', error);
    //             return throwError(() => new Error('Failed to fetch user details'));
    //         })
    //     );
    // }


    // Local and session storage functions
    getUserLoginData(): User[] {
        const userData = localStorage.getItem("userLoginData");
        return userData ? JSON.parse(userData) : [];
    }

    setUserLoginData(updatedUserData: User[]) {
        localStorage.setItem("userLoginData", JSON.stringify(updatedUserData));
    }

    getUserDashData(): UserDash[] {
        const userDashData = localStorage.getItem("userDashData");
        return userDashData ? JSON.parse(userDashData) : [];
    }

    setUserDashData(updatedDashData: UserDash[]) {
        localStorage.setItem("userDashDetails", JSON.stringify(updatedDashData));
    }

    getLoggedIndx(): number {
        const indx = sessionStorage.getItem("loggedIndex");
        return indx ? JSON.parse(indx) : -1;
    }

    setLoggedIndx(indx: number) {
        sessionStorage.setItem("loggedIndex", JSON.stringify(indx));
    }

    authenticateUserCreds(userEmail: string, userPass: string): number {
        const userData = this.getUserLoginData();
        let indx: number = -404;
        for (let x = 0; x < userData.length; x++) {
            if (userData[x].email == userEmail) {
                indx = x;
                break;
            }
        }
        if (indx < 0) return indx;
        if (userData[indx].password == userPass) {
            return indx;
        }
        return -400;
    }
}
function getLoggedUserId(): any {
    throw new Error('Function not implemented.');
}

