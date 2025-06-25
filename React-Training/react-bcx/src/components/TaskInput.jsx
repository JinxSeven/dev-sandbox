import * as React from "react";
import Input from "@mui/joy/Input";

export default function TaskInput({ color = "primary" }) {
  return (
    <Input
      id="task-field"
      color={color}
      size="lg"
      variant="soft"
      placeholder="Task title..."
    />
  );
}
