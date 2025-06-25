export interface UserStats {
    totalTasks: number;
    newTasksPercentage: number;
    activeTasksPercentage: number;
    completedTasksPercentage: number;
    totalCompliances: number;
    completedCompliances: number;
    totalHoursLogged: number;
    totalHoursWorkedForWeek: number;
    totalHoursWorkedForDay: number;
    value: { label: string; color: string; value: number }[]
}