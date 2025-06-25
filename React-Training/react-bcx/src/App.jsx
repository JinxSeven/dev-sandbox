import "./App.css";
import AddTask from "./components/AddTask";
import TaskItem from "./components/TaskItem";
import { useState, useEffect } from "react";
import styled from 'styled-components';


function App() {
  const [taskData, addTaskData] = useState([]);
  const [taskCount, addTaskCount] = useState(1);
  
  useEffect(() => {
    console.log("This runs first");
    return () => {
      console.log("this runs second");
    }
  }, [taskData]);


  const proceedAddingTask = (taskTitle) => {
    addTaskData((taskData) => [
      ...taskData,
      {
        title: taskTitle,
        isCompleted: false,
        id: taskCount
      }
    ]);
    addTaskCount((taskCount) => taskCount + 1);
  }

  const toggleTaskStatus = (taskId) => {
    addTaskData((taskData) => 
      taskData.map(task => 
        task.id === taskId 
          ? {...task, isCompleted: !task.isCompleted} 
          : task
      )
    );
  }

  function deleteTask(taskId) {
    addTaskData((taskData) => 
      taskData.filter(task => task.id !== taskId)
    );
  }

  const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  `

  return (
    <>
      <AddTask onAddTask={proceedAddingTask}></AddTask>
      <TaskContainer>
        {taskData.map((task) => (
          <TaskItem key={task.id}
            id={task.id}
            title={task.title}
            isCompleted={task.isCompleted}
            toggleTaskStatus={toggleTaskStatus}
            deleteTask={deleteTask}
          ></TaskItem>
        ))}
      </TaskContainer>
    </>
  );
}

export default App;
