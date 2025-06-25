export interface Project {
    id: string; // GUID as a string
    projectName: string; // Required field
    description?: string | null; // Optional or nullable
    startDate: Date; // ISO 8601 date-time string (or Date if parsed)
    endDate?: Date | null; // Optional or nullable (ISO 8601 date-time string or Date)
    clientId: string; // GUID as a string
}