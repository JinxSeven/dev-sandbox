import { Component, computed, signal } from '@angular/core';
import { CommonModule, NgForOfContext } from '@angular/common';
import { Todo } from './todo';
import {
    FormControl,
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
} from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './app.component.html',
    styles: `body {
        background-color: #121212; /* Dark background */
        color: aliceblue; /* White text color */
    }

    h2 {
        text-align: center;
        padding-top: 5vh;
        color: aliceblue;
    }

    form {
        max-width: 400px; /* Limit the width of the form */
        margin: 20px auto; /* Centering the form */
        padding: 20px; /* Padding around the form */
        background-color: #1e1e1e; /* Dark card background */
        border-radius: 8px; /* Rounded corners */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* Subtle shadow */
    }

    label {
        display: block; /* Block display for labels */
        margin: 10px 0 5px; /* Spacing adjustments */
        font-weight: bold; /* Make label bold */
        color: aliceblue;
    }

    input[type="text"],
    input[type="number"],
    select {
        width: 100%; /* Full width input fields */
        padding: 10px; /* Padding inside input fields */
        margin-bottom: 15px; /* Spacing below input fields */
        border: 1px solid #333; /* Dark border */
        border-radius: 5px; /* Rounded edges for input */
        background-color: #3a3a3a; /* Dark input background */
        color: #ffffff; /* White text color within inputs */
    }

    /* Change border color on focus */
    input[type="text"]:focus,
    input[type="number"]:focus,
    select:focus {
        outline: none; /* Remove default outline */
        border-color: #4302da; /* Highlight border color */
        box-shadow: 0 0 5px rgba(98, 0, 238, 0.5); /* Light glow effect */
    }

    input[type="submit"] {
        width: 100%; /* Full width for button */
        padding: 10px; /* Padding inside button */
        background-color:#4302da; /* Button color */
        border: none; /* No border */
        color: #ffffff; /* White text color on button */
        border-radius: 5px; /* Rounded corners for button */
        cursor: pointer; /* Pointer cursor on hover */
        font-size: 16px; /* Bigger font size */
        transition: background-color 0.3s;
    }

    .todo-container {
        background-color: #1e1e1e; /* Dark background */
        color: #ffffff; /* Light text */
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        max-width: 400px;
        margin: 20px auto;
    }

    .todo-title {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
    }

    .todo-table {
        width: 100%;
        border-collapse: collapse;
    }

    .todo-table th,
    .todo-table td {
        padding: 10px;
        text-align: left;
        border: 1px solid #4a4a4d; /* Table border */
    }

    .todo-table th {
        background-color: #3a3b3c; /* Dark header background */
    }

    .todo-table tr:nth-child(even) {
        background-color: #3a3b3c; /* Striping for rows */
    }

    .todo-table tr:hover {
        background-color: #4a4a4d; /* Highlight on hover */
    }

    .completed {
        text-decoration: line-through; /* Strike-through for completed tasks */
        color: #a0a0a0; /* Gray text for completed tasks */
    }

    .status.completed {
        color: #28a745; /* Green color for completed */
    }

    .status.incomplete {
        color: #dc3545; /* Red color for incomplete */
    }

    .counter {
        background-color: #1e1e1e;/* Dark background color */
        color: aliceblue;           /* Light text color */
        text-align: center;
        border-radius: 8px;    /* Rounded corners */
        padding: 15px;         /* Padding inside the counter */
        margin-top: 20px;      /* Space above the counter */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Subtle shadow to lift the box off the background */
        width: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px auto;
    }

    .counter-item {
        font-size: 16px;         /* Font size for counter items */
        margin-bottom: 10px;     /* Space between counter items */
        transition: all 0.3s;    /* 100.3s */
        // transition: all 100.3s;    /* 100.3s */
    }

    .counter-item:hover {
        color:#00ff15;         /* Change color on hover */
        transform: scale(1.05);  /* Slightly scale on hover */
        // transform: rotate(1800060deg) /* 1800060deg */
    }

    /* Button hover effect */
        input[type="submit"]:hover {
        background-color: #3700b3; /* Darker shade on hover */
    }`,
})

export class AppComponent {
    todoForm = new FormGroup({
        taskId: new FormControl(''),
        taskTitle: new FormControl(''),
        taskStatus: new FormControl(''),
    });

    todos = signal<Todo[]>([]);
    noOfTasks = computed(() => {
        return this.todos().length
    });
    completedTasks = computed(() => {
        return this.todos().filter(task => {
            task.status == true;
        }).length
    });
    inCompleteTasks = computed(() =>
        this.noOfTasks() - this.completedTasks()
    );

    addTodoTask(taskForm: any) {
        let taskStatus: boolean;
        this.todoForm.value.taskStatus == 'Complete'
            ? (taskStatus = true)
            : (taskStatus = false);
        const newTask: Todo = {
            id: parseInt(this.todoForm.value.taskId!.toString()),
            title: this.todoForm.value.taskTitle!,
            status: taskStatus!,
        };
        this.updateTodo(newTask);
        taskForm.reset();
    }

    updateTodo(newTask: Todo) {
        this.todos.update((todo) => [...this.todos(), newTask]);
        console.log(this.completedTasks());
    }
}
