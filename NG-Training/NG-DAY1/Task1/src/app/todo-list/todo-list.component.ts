import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../shared/interface.task';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.css',
})

export class TodoListComponent {
    taskData: Task[] = [];
    editMode = false;
    taskToEditIndx: number | null = null;
    taskToEdit: Task = {
        taskName: '',
        userName: '',
        taskStatus: false
    }

    addNewTask(taskForm: NgForm) {
        if (this.editMode) {
            this.taskData[this.taskToEditIndx!] = {
                taskName: taskForm.controls['taskName'].value,
                userName: taskForm.controls['userName'].value,
                taskStatus: false
            }
            this.editMode = !this.editMode;
            this.taskToEditIndx = null;
            taskForm.reset();
            return;
        }
        const taskObj: Task = {
        taskName: taskForm.controls['taskName'].value,
        userName: taskForm.controls['userName'].value,
        taskStatus: false
        }
        this.taskData.push(taskObj);
        taskForm.reset();
    }

    onStatusChange(index: number) {
        const task = this.taskData[index];
        console.log(task);
    }

    onEditTask(index: number) {
        this.editMode = !this.editMode;
        this.taskToEdit = this.taskData[index];
        this.taskToEditIndx = index;
    }

    onDeleteTask(index: number) {
        this.taskData.splice(index, 1);
    }
}
