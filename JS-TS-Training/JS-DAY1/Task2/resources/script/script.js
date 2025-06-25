let todoButton = document.getElementById('add-todo-task');
let taskInput = document.getElementById('todo-input');
let taskList = document.querySelector('ul');

taskInput.addEventListener('blur', function() {
    if (taskInput.value == '') {
        document.getElementById('task-err').style.opacity = '1';
        taskInput.style.borderColor = 'rgb(218, 43, 43)'
        taskList.removeChild(taskItem);
    } else {
        document.getElementById('task-err').style.opacity = '0';
        taskInput.style.borderColor = '#d8d8d8';
    }
})

todoButton.addEventListener('click', function() {
    let taskItem = document.createElement('li');
    let taskCheck = document.createElement('input');
    let deleteButton = document.createElement('button');
    let taskName = document.createElement('input');
    
    if (taskInput.value == '') {
        document.getElementById('task-err').style.opacity = '1';
        taskInput.style.borderColor = 'rgb(218, 43, 43)'
        taskList.removeChild(taskItem);
    } else {
        document.getElementById('task-err').style.opacity = '0';
        taskInput.style.borderColor = '#d8d8d8';
    }

    taskName.value = taskInput.value;
    taskInput.value = '';
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('class', 'delete-button')
    taskName.setAttribute('id', 'task-edit');
    taskName.setAttribute('placeholder', "Task can't be empty!");

    taskCheck.setAttribute('type', 'checkbox');
    taskCheck.setAttribute('class', 'check-box');

    taskItem.append(taskCheck);
    taskItem.append(taskName);
    taskItem.append(deleteButton);

    taskList.append(taskItem);

    taskCheck.addEventListener('change', function() {
        if (taskCheck.checked) {
            taskName.style.textDecoration = 'line-through';
        } else {
            taskName.style.textDecoration = 'none';
        }
    })

    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
    })


    taskName.onblur = function taskRename() {
        if (taskName.value == '') {
            taskCheck.disabled = true;
        } else {
            taskCheck.disabled = false;
        }
    }
})


