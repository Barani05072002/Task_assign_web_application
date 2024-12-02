import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Typography, Snackbar, Alert } from "@mui/material";

const TaskForm = ({ onAdd, loggedInUser, editingTask }) => {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("In-Todo");
  const [error, setError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Populate form fields when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setAssignedTo(editingTask.assignedTo || "");
      setPriority(editingTask.priority || "");
      setStatus(editingTask.status || "In-Todo");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !assignedTo || !priority) {
      setError("All fields are required!");
      setShowSnackbar(true);
      return;
    }

    onAdd({
      title,
      assignedBy: loggedInUser,
      assignedTo,
      priority,
      status,
    });

    // Reset form fields after submission
    setTitle("");
    setAssignedTo("");
    setPriority("");
    setStatus("In-Todo");
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          {editingTask ? "Edit Task" : "Create a New Task"}
        </Typography>
        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
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
          required
        >
          {JSON.parse(localStorage.getItem("users"))?.map((user, index) => (
            <MenuItem key={index} value={user.firstname}>
              {user.firstname}
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
          required
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
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
      </form>

      {/* Snackbar for error feedback */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TaskForm;
