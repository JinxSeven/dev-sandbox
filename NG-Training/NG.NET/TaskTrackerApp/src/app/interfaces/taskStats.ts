export interface TaskStats {
    username: string;
    id: string;
    email: string;
    isAdmin: boolean;
    totalTasks: number;
    newPercentage: number;
    activePercentage: number;
    completePercentage: number;
    value: { label: string; color: string; value: number }[];
}