import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardModule } from 'primeng/card';
import { MeterGroup } from 'primeng/metergroup';
import { DividerModule } from 'primeng/divider';
import { ApiService } from '../api.service';
import { TaskStats } from '../interfaces/taskStats';
import { Dialog } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import {
    FormControl,
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
} from '@angular/forms';
import { Toast } from 'primeng/toast';
import { User } from '../interfaces/user';
import { MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { Client } from '../interfaces/client';
import { Project } from '../interfaces/project';
import { Question } from '../interfaces/question';
import { Option } from '../interfaces/option';
import { compliance } from '../interfaces/compliance';
import { Presentation } from '../interfaces/presentation';
import { ComplianceDTO } from '../interfaces/compliance-dto';
import { Select } from 'primeng/select';
import { UserStats } from '../interfaces/user-stats';
import { StopWatchComponent } from "../stop-watch/stop-watch.component";
import { AssignedComplianceDTO } from '../interfaces/assigned-compliance-dto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    standalone: true,
    selector: 'app-user-dash',
    imports: [
    CommonModule,
    HeaderComponent,
    CardModule,
    MeterGroup,
    Dialog,
    Toast,
    StepperModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    ButtonModule,
    StopWatchComponent
],
    templateUrl: './user-dash.component.html',
    styleUrl: './user-dash.component.css',
    providers: [MessageService],
})
export class UserDashComponent {
    apiServe = inject(ApiService);

    userStats: UserStats = {
        totalTasks: 0,
        newTasksPercentage: 0,
        activeTasksPercentage: 0,
        completedTasksPercentage: 0,
        totalCompliances: 0,
        completedCompliances: 0,
        totalHoursLogged: 0,
        totalHoursWorkedForWeek: 0,
        totalHoursWorkedForDay: 0,
        value: [] // Empty array for the `value` property
    };

    clientData: Client[] = [];
    projectsByClient: Project[] = [];

    complianceData: AssignedComplianceDTO[] = [];

    showTakeCompliance = false;
    showNotificationPanel = false;

    optionCount = [1, 2];
    question: string = '';
    options: string[] = ['', ''];
    correctOptionIndx: number | null = null;

    questions: Question[] = [];

    compName: string = '';
    selectedPdftUrl: SafeResourceUrl | null = null;

    complianceForm = new FormGroup({
        complianceTitle: new FormControl(''),
        complianceDesc: new FormControl(''),
        compliancePercent: new FormControl(100),
    });

    loggedUser!: User;

    isAdmin: boolean;

    constructor(private messageService: MessageService, private sanitizer: DomSanitizer) {
        this.loggedUser = this.getLoggedUser();
        this.isAdmin = this.loggedUser?.isAdmin;


        this.apiServe.getAllClients().subscribe((clients) => {
            this.clientData = clients;
            if (this.clientData.length > 0) {
                this.apiServe
                    .getProjectsByClientId(this.clientData[0]?.id)
                    .subscribe((projects) => {
                        this.projectsByClient = projects;
                });
            }
        });

        this.apiServe.getAssignedCompliancesById(this.loggedUser.id).subscribe((compliances) => {
            this.complianceData = compliances;
            this.complianceData.forEach((compliance) => {
                compliance.createdBy = compliance.createdBy.split('.')
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                .join(' ');
            });
            console.log(compliances);
        });
    }

    async ngOnInit() {
        this.userStats = await this.apiServe.GetUserStatsById(this.loggedUser.id);
        this.addValues();
        console.log(this.userStats);
    }

    showNotification() {}

    getLoggedUser(): User {
        const loggedUser = sessionStorage.getItem('LoggedUser');
        return JSON.parse(loggedUser!);
    }

    addOption(count: number) {
        this.optionCount.push(count);
        this.options.push('');
    }

    removeOption() {
        this.optionCount.pop();
        this.options.pop();
    }

    setCorrectOption(index: number) {
        this.correctOptionIndx = index;
    }

    getProjectDataByClientId(clientId: string) {
        this.apiServe.getProjectsByClientId(clientId).subscribe((projects) => {
            this.projectsByClient = projects;
        });
    }

    openAssesment(compId: string, compName: string) {
        this.compName = compName;
        console.log(compId);
        this.showTakeCompliance = true;

        this.apiServe.getPptByComplianceId(compId).subscribe((ppt) => {
            if (ppt?.fileData) {
                const byteCharacters = atob(ppt.fileData); // Decode Base64
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                // Convert to Blob
                const blob = new Blob([byteArray], { type: 'application/pdf' });

                const pdfUrl = window.URL.createObjectURL(blob);

                // Sanitize URL for iframe
                this.selectedPdftUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
            } else {
                console.error("No file data received.");
            }
        });
    }

    addValues() {
        this.loggedUser.username = this.loggedUser.username
            .split('.')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
        this.userStats!.value || []; // Ensure it's initialized
        this.userStats!.value = [
            {
                label: 'New',
                color: '#0d6efd',
                value: this.userStats!.newTasksPercentage + 0.05,
            },
            {
                label: 'Complete',
                color: '#198754',
                value: this.userStats!.completedTasksPercentage + 0.05,
            },
            {
                label: 'Active',
                color: '#ffc107',
                value: this.userStats!.activeTasksPercentage + 0.05,
            }
        ];
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
