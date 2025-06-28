import { Option } from "./option";

export interface Question {
    id?: string;
    questionText: string;
    options: Option[];
}