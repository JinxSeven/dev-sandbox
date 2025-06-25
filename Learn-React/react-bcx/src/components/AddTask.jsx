import * as React from "react";
import Button from "@mui/joy/Button";
import Snackbar from "@mui/joy/Snackbar";
import TaskInput from "./taskInput";

export default function AddTask({ onAddTask }) {
  const [isValid, setIsValid] = React.useState(true);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  const addTask = () => {
    const taskInp = document.getElementById("task-field");
    if (taskInp.value.trim() === "") {
      setShowSnackbar(true);
      setIsValid(false);
      return;
    } else {
      onAddTask(taskInp.value);
      taskInp.value = "";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      <TaskInput color={isValid ? "primary" : "danger"} />
      <Button variant="solid" onClick={addTask}>
        Add Task
      </Button>

      <Snackbar
        autoHideDuration={2500}
        color="danger"
        variant="outlined"
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      >
        Empty tasks can't be added!
      </Snackbar>
    </div>
  );
}
