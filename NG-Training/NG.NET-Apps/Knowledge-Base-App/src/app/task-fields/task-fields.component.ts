import { Attribute, Component, computed, inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { User } from '../interfaces/user';
import { Task } from '../interfaces/task';
import { ApiService } from '../api.service';
import { Activity } from '../interfaces/activity';
import { HeaderComponent } from '../header/header.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { firstValueFrom, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-task-fields',
    imports: [
        FormsModule,
        HeaderComponent,
        ReactiveFormsModule,
        ToastModule,
        ButtonModule,
        Toast,
        TabsModule,
        CommonModule,
    ],
    providers: [MessageService],
    templateUrl: './task-fields.component.html',
    styleUrl: './task-fields.component.css',
})
export class TaskFieldsComponent implements OnInit {
    apiCalls = inject(ApiService);

    loggedUser?: User;
    toDate: string;
    enableNextTask: boolean = false;
    latestTaskId: string | null = null;
    maxActivityHours: number = 0;
    accuActivityHours: number = 0;
    editMode$: Observable<boolean> = this.apiCalls.editMode$;

    adminList: any[] = [];
    userList: any[] = [];
    clientList: any[] = [];
    projectList: any[] = [];

    isUser: boolean;

    taskForm!: FormGroup;
    actForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService
    ) {
        this.loggedUser = this.getLoggedUser();
        this.apiCalls.getAdminList().subscribe((usernames) => {
            this.adminList.push(...usernames);
        });
        this.apiCalls.getUserList().subscribe((usernames) => {
            this.userList.push(...usernames);
        });
        this.apiCalls.getClientList().subscribe((clients) => {
            this.clientList.push(...clients);
        });

        this.isUser = !this.loggedUser?.isAdmin;

        this.toDate = new Date().toISOString().split('T')[0];

        this.actForm = this.fb.group({
            actTitle: ['', Validators.required],
            actDescription: ['', Validators.required],
            actHours: [
                null,
                [Validators.required, Validators.min(0.1), Validators.max(2)],
            ],
        });

        if (this.isUser) {
            console.log(this.isUser);
            this.taskForm = this.fb.group({
                clientName: ['', Validators.required],
                projectName: ['', Validators.required],
                taskTitle: ['', Validators.required],
                taskETA: [
                    null,
                    [
                        Validators.required,
                        Validators.min(0.1),
                        Validators.max(24),
                    ],
                ],
                taskDate: [this.toDate.substring(0, 10), Validators.required],
                assignedTo: [
                    { value: this.loggedUser!.username, disabled: true },
                    Validators.required,
                ],
                assignedBy: ['', Validators.required],
                taskState: ['new', Validators.required],
                taskPriority: ['', Validators.required],
                description: ['', Validators.required],
            });

            return;
        }

        this.taskForm = this.fb.group({
            clientName: ['', Validators.required],
            projectName: ['', Validators.required],
            taskTitle: ['', Validators.required],
            taskETA: [
                null,
                [Validators.required, Validators.min(0.1), Validators.max(24)],
            ],
            taskDate: [this.toDate.substring(0, 10), Validators.required],
            assignedTo: ['', Validators.required],
            assignedBy: [
                { value: this.loggedUser!.username, disabled: true },
                Validators.required,
            ],
            taskState: ['new', Validators.required],
            taskPriority: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    async ngOnInit(): Promise<void> {
        const editMode = await firstValueFrom(this.editMode$);

        if (editMode) {
            const editTaskData = this.apiCalls.dataToEdit?.task!;

            this.taskForm = this.fb.group({
                clientName: [editTaskData.clientName, Validators.required],
                projectName: [editTaskData.projectName, Validators.required],
                taskTitle: [editTaskData.taskTitle, Validators.required],
                taskETA: [
                    editTaskData.hours,
                    [
                        Validators.required,
                        Validators.min(0.1),
                        Validators.max(24),
                    ],
                ],
                taskDate: [
                    editTaskData.dateTime.toString().split('T')[0],
                    Validators.required,
                ],
                assignedTo: [editTaskData.assignedTo, Validators.required],
                assignedBy: [editTaskData.assignedBy, Validators.required],
                taskState: [editTaskData.taskState, Validators.required],
                taskPriority: [editTaskData.priority, Validators.required],
                description: [editTaskData.description, Validators.required],
            });
        }
    }

    getLoggedUser(): User {
        const loggedUser = sessionStorage.getItem('LoggedUser');
        return JSON.parse(loggedUser!);
    }

    getProjectListByClientId() {
        const clientName = this.taskForm.controls['clientName'].value;
        const selectedClient = this.clientList.find((client) => client.clientName === clientName);

        this.projectList = [];

        this.apiCalls.getProjectListByClientId(selectedClient.id).subscribe((projects) =>{
            this.projectList.push(...projects);
        })
    }

    findAssignedToId(username: string) : string {
        let userId: string | null = null;
        this.userList.find((user) => {
            if (user.username === username) {
                userId = user.id;
            }
        });
        if (userId != null) return userId;

        this.adminList.find((admin) => {
            if (admin.username === username) {
                userId = admin.id;
            }
        });
        if (userId != null) return userId;

        return '';
    }

    async onSaveTask() {
        const editMode = await firstValueFrom(this.editMode$);
        if (!this.taskForm.valid || editMode) return;

        const postData: Task = {
            id: this.loggedUser!.id!, /* UserId masquerading to be TaskId */
            userId: this.findAssignedToId(this.taskForm.controls['assignedTo'].value),
            clientName: this.taskForm.controls['clientName'].value,
            projectName: this.taskForm.controls['projectName'].value,
            taskTitle: this.taskForm.controls['taskTitle'].value,
            hours: this.taskForm.controls['taskETA'].value,
            dateTime: this.taskForm.controls['taskDate'].value,
            assignedTo: this.taskForm.controls['assignedTo'].value,
            assignedBy: this.taskForm.controls['assignedBy'].value,
            taskState: this.taskForm.controls['taskState'].value,
            priority: this.taskForm.controls['taskPriority'].value,
            description: this.taskForm.controls['description'].value,
        };
        console.log(postData);
        await this.apiCalls.addNewTask(postData).subscribe({
            next: (response: any) => {
                this.latestTaskId = response;
                this.maxActivityHours = postData.hours;
                this.enableNextTask = !this.enableNextTask;
                // console.log("Task added!", this.latestTaskId);
                this.showToast(
                    'success',
                    'Task Created!',
                    'Another masterpiece added to your task list!'
                );
            },
            error: (error) => {
                if (error.status === 400) {
                    console.error('Error: ', error);
                } else {
                    console.error('POST request failed', error);
                }
                this.showToast(
                    'error',
                    'Oops!',
                    'The server is taking a coffee break. Try again in a bit!'
                );
            },
        });
    }

    onUpdateTask() {
        const editTaskData = this.apiCalls.dataToEdit?.task!;

        const postData: Task = {
            id: editTaskData.id,
            userId: editTaskData.userId,
            clientName: this.taskForm.controls['clientName'].value,
            projectName: this.taskForm.controls['projectName'].value,
            taskTitle: this.taskForm.controls['taskTitle'].value,
            hours: this.taskForm.controls['taskETA'].value,
            dateTime: this.taskForm.controls['taskDate'].value,
            assignedTo: this.taskForm.controls['assignedTo'].value,
            assignedBy: this.taskForm.controls['assignedBy'].value,
            taskState: this.taskForm.controls['taskState'].value,
            priority: this.taskForm.controls['taskPriority'].value,
            description: this.taskForm.controls['description'].value,
        };
        console.log(postData);
        this.apiCalls.updateTask(postData).subscribe({
            next: (response) => {
                this.showToast(
                    `success`,
                    `Task Updated!`,
                    `Shine on! Your task just got an upgrade!`
                );
            },
            error: (error) => {
                if (error.status === 400) {
                    console.error('PUT request failed', error);
                } else {
                    console.error('Error: ', error);
                }
                this.showToast(
                    'error',
                    'Oops!',
                    'The server is taking a coffee break. Try again in a bit!'
                );
            },
        });
    }

    onNextTask() {
        this.enableNextTask = !this.enableNextTask;
        this.latestTaskId = null;
        this.onTaskFormReset();
    }

    onSaveActivity() {
        if (!this.latestTaskId) {
            this.showToast(`warn`, `Uh-oh!`, `No task to link activity with!`);
            return;
        }
        const postData: Activity = {
            id: this.latestTaskId!,
            taskId: this.latestTaskId!,
            activityTitle: this.actForm.controls['actTitle'].value,
            description: this.actForm.controls['actDescription'].value,
            hours: this.actForm.controls['actHours'].value,
        };
        this.apiCalls.addNewActivity(postData).subscribe({
            next: (response) => {
                // console.log('Activity added!', response);
                this.showToast(
                    `success`,
                    `Activity Added!`,
                    `Your task journey just got brighter!`
                );
            },
            error: (error) => {
                if (error.status === 400) {
                    console.error('Error: ', error);
                } else {
                    console.error('POST request failed', error);
                }
                this.showToast(
                    'error',
                    'Oops!',
                    'The server is taking a coffee break. Try again in a bit!'
                );
            },
        });
        this.onActFormReset();
    }

    onTaskFormReset() {
        console.log(`runs`);
        this.taskForm.reset({
            taskDate: this.toDate.substring(0, 10),
            assignedTo: this.loggedUser!.username,
        });
    }

    onActFormReset() {
        this.actForm.reset();
    }

    showToast(severity: string, summary: string, detail: string) {
        this.messageService.add({
            severity: `${severity}`,
            summary: `${summary}`,
            detail: `${detail}`,
            life: 3000,
        });
    }
}
