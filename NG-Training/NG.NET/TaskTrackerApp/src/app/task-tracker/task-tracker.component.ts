import { Component, inject, SimpleChanges } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Task } from '../interfaces/task';
import { User } from '../interfaces/user';
import { Activity } from '../interfaces/activity';
import { Dialog } from 'primeng/dialog';
import { Tag } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Toast } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TaskData } from '../interfaces/taskData';
import { lastValueFrom } from 'rxjs';
import { DatePicker } from 'primeng/datepicker';

@Component({
    standalone: true,
    selector: 'app-task-tracker',
    imports: [
        HeaderComponent,
        ToastModule,
        Toast,
        DividerModule,
        FormsModule,
        DatePicker,
        Tag,
        TableModule,
        DropdownModule,
        ButtonModule,
        Dialog,
    ],
    templateUrl: './task-tracker.component.html',
    styleUrl: './task-tracker.component.css',
    providers: [MessageService],
})
export class TaskTrackerComponent {
    cancelConfirmation() {
        throw new Error('Method not implemented.');
    }
    apiCalls = inject(ApiService);

    todayDate: Date;
    selectedDate: string;
    userTasks: Task[] = [];
    taskByDate: Task[] = [];
    loggerUser: User;
    totalTaskHours: number = 0;
    totalTaskCount: number = 0;
    dataByDate: any = [];

    selectedTaskState = '';

    showConfirmationDialog = false;
    taskToDeleteId = '';

    constructor(
        private router: Router,
        private messageService: MessageService
    ) {
        this.apiCalls.setEditMode(false);

        this.todayDate = new Date();
        const year = this.todayDate.getFullYear();
        const month = String(this.todayDate.getMonth() + 1).padStart(2, '0'); // Ensure two digits
        const day = String(this.todayDate.getDate()).padStart(2, '0');

        this.selectedDate = `${year}-${month}-${day}`;

        console.log(this.selectedDate);

        this.loggerUser = this.getLoggedUser();
        this.apiCalls.getUserTasks(this.loggerUser.id).subscribe({
            next: (response) => {
                this.userTasks = response;
                console.log('getUserTasks Response: 200');
                this.totalTaskHours = this.getRelevantData();
            },
            error: (error) => {
                if (error.status === 400) {
                    console.error('Error: ', error);
                } else {
                    console.error('Something went wrong! ', error);
                }
                this.showToast(
                    'error',
                    'Oops!',
                    'The server is taking a coffee break. Try again in a bit!'
                );
            },
        });
    }

    onTaskStateChange(taskId: string, event: Event) {
        const newTaskState = (event.target as HTMLSelectElement).value;
        this.apiCalls
            .updateTaskState(taskId, newTaskState)
            .then((response) => {
                if (response.ok) {
                    this.userTasks.forEach((task) => {
                        if (task.id === taskId) {
                            task.taskState = newTaskState;
                        }
                    });

                    if (newTaskState === `complete`) {
                        this.showToast(
                            `success`,
                            `Task Conquered!`,
                            `Here's to learning, growing, and conquering it!`
                        );
                        return;
                    }
                    this.showToast(
                        `info`,
                        `Voilà!`,
                        `Your task state just got updated!`
                    );
                }
            })
            .catch((error) => {
                this.showToast(
                    'error',
                    'Oops!',
                    'The server is taking a coffee break. Try again in a bit!'
                );
            });
    }

    onDateChange(event: any) {
        const year = this.todayDate.getFullYear();
        const month = String(this.todayDate.getMonth() + 1).padStart(2, '0');
        const day = String(this.todayDate.getDate()).padStart(2, '0');
        this.selectedDate = `${year}-${month}-${day}`;
        console.log(this.selectedDate);
        this.totalTaskHours = this.getRelevantData();
    }

    async onTaskEdit(task_id: string) {
        this.apiCalls.dataToEdit = null;

        const task = this.userTasks.find((data: any) => data.id === task_id);

        if (!task) return;

        try {
            const response = await lastValueFrom(
                this.apiCalls.getTaskActivities(task.id)
            );

            const taskData: TaskData = {
                task: task,
                activities: response,
            };

            this.apiCalls.dataToEdit = taskData;
            this.apiCalls.setEditMode(true);
        } catch (error) {
            this.showToast(
                'error',
                'Oops!',
                'The server is taking a coffee break. Try again in a bit!'
            );
            console.error(error);
            return;
        }

        this.router.navigate(['/taskfields']);
    }

    openConfirmationDialog(id: string) {
        this.showConfirmationDialog = true;
        this.taskToDeleteId = id;
    }

    onTaskDelete(taskId: string) {
        console.log(taskId);
        this.apiCalls.deleteTask(taskId).subscribe({
            next: (response: any) => {
                this.showToast(
                    'error',
                    'Task Deleted!',
                    "Task and all its activities were deleted successfully"
                );
                this.apiCalls.getUserTasks(this.loggerUser.id).subscribe({
                    next: (response) => {
                        this.userTasks = response;
                        console.log('deleteTask Response: 200');
                        this.totalTaskHours = this.getRelevantData();
                    },
                    error: (error) => {
                        if (error.status === 400) {
                            console.error('Error: ', error);
                        } else {
                            console.error('Something went wrong! ', error);
                        }
                        this.showToast(
                            'error',
                            'Oops!',
                            'The server is taking a coffee break. Try again in a bit!'
                        );
                    },
                });
            },
            error: (error: any) => {
                if (error.status === 400) {
                    console.error('API response: ', error);
                } else {
                    console.error('Error: ', error);
                }
            },
        });

        this.showConfirmationDialog = false;
    }

    getRelevantData(): number {
        this.totalTaskHours = 0;
        this.totalTaskCount = 0;
        this.dataByDate = [];
        this.taskByDate = [];
        this.userTasks.forEach((task) => {
            console.log(task.dateTime, ' - ', this.selectedDate);
            if (task.dateTime.toString().split('T')[0] == this.selectedDate) {
                this.taskByDate.push(task);
                this.totalTaskHours += task.hours;
                this.totalTaskCount++;
                this.apiCalls.getTaskActivities(task.id).subscribe({
                    next: (response) => {
                        response.forEach((activity: Activity) => {
                            const matchingTasks = this.userTasks.find(
                                (task) => task.id === activity.taskId
                            );
                            if (matchingTasks) {
                                const data = {
                                    activity,
                                    matchingTasks,
                                };
                                this.dataByDate.push(data);
                            }
                        });
                    },
                });
            }
        });
        return this.totalTaskHours;
    }

    getLoggedUser(): User {
        const loggedUser = sessionStorage.getItem('LoggedUser');
        return JSON.parse(loggedUser!);
    }

    onPlusTask() {
        this.router.navigate(['/taskfields']);
        this.apiCalls.dataToEdit = null;
        this.apiCalls.setEditMode(false);
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
