export interface AssignedComplianceDTO {
    id: string;
    complianceName: string;
    complianceDescription: string;
    requiredPercentage: number;
    createdBy: string;
    createdDate: Date; // or Date if you'll convert it
    questionCount: number;
    assignedDate?: Date | null; // or Date if you'll convert it
    isComplete: boolean;
    completedDate?: Date | null; // or Date if you'll convert it
    complianceScore?: number | null;
}