export interface Task {
    id: string;
    userId: string;
    clientName: string;
    projectName: string;
    taskTitle: string;
    hours: number;
    dateTime: Date;
    assignedTo: string;
    assignedBy: string;
    taskState: string;
    priority: string;
    description: string;
}
