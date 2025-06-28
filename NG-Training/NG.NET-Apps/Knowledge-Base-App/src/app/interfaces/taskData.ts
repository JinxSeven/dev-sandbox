import { Activity } from "./activity";
import { Task } from "./task";

export interface TaskData {
    task: Task;
    activities: Activity[];
}