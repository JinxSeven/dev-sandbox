export interface ComplianceDTO {
    id: string; // GUIDs are typically represented as strings in TypeScript
    title: string;
    description: string;
    requiredPercentage: number; // Matches the C# double
    createdBy: string;
    createdDate: string; // DateTimes are often represented as ISO strings
    questionsCount: number;
}
