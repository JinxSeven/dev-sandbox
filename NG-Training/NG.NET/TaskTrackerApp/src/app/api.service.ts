import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './interfaces/user';
import { Task } from './interfaces/task';
import { Activity } from './interfaces/activity';
import { TaskData } from './interfaces/taskData';
import { TaskStats } from './interfaces/taskStats';
import { Client } from './interfaces/client';
import { Project } from './interfaces/project';
import { compliance } from './interfaces/compliance';
import { ComplianceDTO } from './interfaces/compliance-dto';
import { UserStats } from './interfaces/user-stats';
import { AssignedComplianceDTO } from './interfaces/assigned-compliance-dto';
import { Presentation } from './interfaces/presentation';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    async assignCompliance(userId: string, complianceId: string): Promise<Response> {
        const link = `https://localhost:7042/api/Compliance/AssignCompliance?userId=${userId}&compId=${complianceId}`;

        const response = await fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response
    }
    constructor(private http: HttpClient) {}

    private editMode = new BehaviorSubject<boolean>(false);
    editMode$ = this.editMode.asObservable();

    dataToEdit!: TaskData | null;

    private loggedIn: boolean = false;

    isAuthenticated() {
        return this.loggedIn;
    }

    setAuthenticated(state: boolean) {
        this.loggedIn = state;
    }

    setEditMode(state: boolean) {
        this.editMode.next(state);
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

    LoggingUser(username: string, password: string): Observable<User> {
        return this.http.get<User>(
            `https://localhost:7042/api/User/GetLoggedUser?username=${username}&password=${password}`
        );
    }

    async GetUserStatsById(userId: string): Promise<UserStats> {
        const response = await fetch(`https://localhost:7042/api/User/GetUserStatsById?userId=${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json(); // Parse response body as JSON
    }

    addNewUser(postData: User): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/User/AddNewUser',
            postData
        );
    }

    addNewCompliance(postData: compliance): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/Compliance/AddNewCompliance',
            postData
        );
    }

    getComplianceDetails(): Observable<ComplianceDTO[]> {
        return this.http.get<ComplianceDTO[]>(
            `https://localhost:7042/api/Compliance/GetComplianceDetails`
        );
    }

    getAssignedCompliancesById(userId: string): Observable<AssignedComplianceDTO[]>  {
        return this.http.get<AssignedComplianceDTO[]>(
            `https://localhost:7042/api/Compliance/GetAssignedCompliancesById?userId=${userId}`
        );
    }

    getPptByComplianceId(compId: string): Observable<Presentation> {
        return this.http.get<Presentation>(
            `https://localhost:7042/api/Compliance/GetPptByComplianceId?compId=${compId}`,
        );
    }

    getAdminList(): Observable<any> {
        return this.http.get<any>(
            `https://localhost:7042/api/User/GetAllAdminNames`
        );
    }

    getUserList(): Observable<any> {
        return this.http.get<any>(
            `https://localhost:7042/api/User/GetAllUserNames`
        );
    }

    getClientList(): Observable<any> {
        return this.http.get<any>(
            `https://localhost:7042/api/Client/GetAllClientNames`
        );
    }

    getProjectListByClientId(clientId: string): Observable<any> {
        return this.http.get<any>(
            `https://localhost:7042/api/Project/GetProjectListByClientId?clientId=${clientId}`
        );
    }

    getProjectsByClientId(clientId: string): Observable<Project[]> {
        return this.http.get<Project[]>(
            `https://localhost:7042/api/Project/getProjectsByClientId?clientId=${clientId}`
        )
    }

    getAllClients(): Observable<Client[]> {
        return this.http.get<Client[]>(
            `https://localhost:7042/api/Client/GetAllClients`
        )
    }

    addNewTask(postData: Task): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/Task/AddNewTask',
            postData
        );
    }

    addNewActivity(postData: Activity): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/Activity/AddNewActivity',
            postData
        );
    }

    getUserTasks(userId: string): Observable<any> {
        return this.http.get<any>(
            `https://localhost:7042/api/Task/GetTasks?userId=${userId}`
        );
    }

    getTaskActivities(taskId: string): Observable<Activity[]> {
        return this.http.get<any>(
            `https://localhost:7042/api/Activity/GetTaskActivities?taskId=${taskId}`
        );
    }

    async updateTaskState(taskId: string, newState: string): Promise<Response> {
        const link = `https://localhost:7042/api/Task/UpdateTaskState?taskId=${taskId}&taskState=${newState}`;

        const response = await fetch(link, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response;
    }

    getUserTaskStats(): Observable<TaskStats[]> {
        return this.http.get<TaskStats[]>(
            `https://localhost:7042/api/Task/GetUserTaskStats`
        );
    }

    updateTask(postData: Task): Observable<any> {
        return this.http.put<any>(
            'https://localhost:7042/api/Task/EditTask',
            postData
        );
    }

    deleteTask(taskId: string): Observable<any> {
        return this.http.delete<any>(
            `https://localhost:7042/api/Task/DeleteTask?taskId=${taskId}`
        );
    }
}
