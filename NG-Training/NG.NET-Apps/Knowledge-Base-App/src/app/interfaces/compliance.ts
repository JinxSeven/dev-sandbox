import { Presentation } from "./presentation";
import { Question } from "./question";

export interface compliance {
    id?: string;
    title: string;
    description: string;
    requiredPercentage: number;
    createdBy: string;
    createdDate: Date;

    presentation: Presentation;

    questions: Question[];
}