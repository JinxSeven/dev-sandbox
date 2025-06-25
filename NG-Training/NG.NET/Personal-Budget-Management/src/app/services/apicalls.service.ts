import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginData, NewUserData } from '../interfaces/post-data';
import { Transacts, UserDetails, UserTransactions } from '../interfaces/user-dash';

@Injectable({
    providedIn: 'root',
})
export class ApicallsService {
    loggedUserId: number = 102;

    constructor(private http: HttpClient) {}

    testGet() {
        this.http
            .get<any>(`https://localhost:7166/api/Users?user_id=102`)
            .subscribe({
                next: (result: any) => {
                    console.log(result);
                },
            });
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 200) {
            console.error(
                'Backend returned code 200, body was: ',
                JSON.stringify(error.error)
            );
        } else {
            console.error('An error occurred:', error.message);
        }
        return throwError(
            () => new Error('Something went wrong; please try again later.')
        );
    }

    postUserData(postData: NewUserData): Observable<any> {
        return this.http
            .post<any>('https://localhost:7166/api/Users/AddUser', postData)
            .pipe(
                tap((response) => console.log('POST request successful')),
                catchError(this.handleError)
            );
    }

    validateLoggingUser(postData: LoginData): Observable<any> {
        return this.http
            .post<any>('https://localhost:7166/api/Users/UserLogin', postData)
            .pipe(
                tap((response) => console.log('POST request successful')),
                catchError(this.handleError)
            );
    }

    getUserDetails(user_id: number): Observable<UserDetails[]> {
        return this.http
        .get<UserDetails[]>(`https://localhost:7166/api/Users?user_id=${user_id}`)
        .pipe(
            tap((response) => console.log('GET request successful')),
            catchError(this.handleError)
        );
    }


    getUserTransactions(user_id: number): Observable<Transacts[]> {
        return this.http
        .get<Transacts[]>(`https://localhost:7166/api/Transactions?user_id=${user_id}`)
        .pipe(
            tap((response) => console.log('GET request successful')),
            catchError(this.handleError)
        );
    }
}
