import * as React from "react";
import IconButton from '@mui/joy/IconButton';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

export default function TaskItem({ title, isCompleted, id, toggleTaskStatus, deleteTask }) {
  function onTaskClick(taskId) {
    toggleTaskStatus(taskId);
  }

  function onDelClick(taskId) {
    deleteTask(taskId);
  }

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        flexDirection: "row",
        backgroundColor: "#2b2f3e",
        color: "#000",
        justifyContent: "space-between",
        borderRadius: "10px",
        textAlign: "left"
      }}
      onClick={() => onTaskClick(id)}
    >
      <div>
        <p style={{margin: "0", color: "#f4f8f9"}}><span>{id}. </span>{title}</p>
        <p style={{margin: "0", color: isCompleted ? "#27c93f" : "#ff5f56"}} className="">{isCompleted ? "Task completed" : "Task not completed"}</p>
      </div>
      <IconButton
        style={{color: "#ff5f56", padding: "5px 10px", borderRadius: "20%"}}
        onClick={() => onDelClick(id)}
      ><DeleteForeverSharpIcon /></IconButton>
    </div>
  );
}
