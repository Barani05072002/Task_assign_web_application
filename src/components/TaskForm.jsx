import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";

const TaskForm = ({ onAdd, loggedInUser }) => {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("In-Todo"); // Default status set to "In-Todo"

  const users = ["Alice", "Bob", "Charlie", "David"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && assignedTo && priority) {
      onAdd({
        title,
        assignedBy: loggedInUser,
        assignedTo,
        priority,
        status, // Default status "In-Todo" or user-selected value
      });
      setTitle("");
      setAssignedTo("");
      setPriority("");
      setStatus("In-Todo"); // Reset to default after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Assigned By"
        value={loggedInUser}
        disabled
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        fullWidth
        margin="normal"
      >
        {users.map((user) => (
          <MenuItem key={user} value={user}>
            {user}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </TextField>
      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="In-Todo">In-Todo</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;
