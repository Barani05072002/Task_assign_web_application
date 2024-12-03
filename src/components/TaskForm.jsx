import React, { useState, useEffect } from "react";
import { TextField, Button, Box, MenuItem, Snackbar } from "@mui/material";

const TaskForm = ({ onAdd, loggedInUser, task }) => {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("In Progress");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch users from localStorage and filter out the logged-in user
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Exclude the logged-in user from the list
    const filtered = users.filter((user) => user.firstname !== loggedInUser);
    setFilteredUsers(filtered);

    // If we are editing a task, populate the form fields
    if (task) {
      setTitle(task.title || "");
      setAssignedTo(task.assignedTo || "");
      setPriority(task.priority || "Low");
      setStatus(task.status || "In Progress");
    }
  }, [task, loggedInUser]);

  const handleSubmit = () => {
    // Basic validation to check if title and assignedTo are filled
    if (!title || !assignedTo) {
      setErrorMessage("Title and Assigned To fields are required!");
      setOpenSnackbar(true);
      return;
    }

    // Create a new task with the currently logged-in user as "assignedBy"
    const newTask = {
      title,
      assignedTo,
      priority,
      status,
      assignedBy: loggedInUser, // Set the logged-in user as "assignedBy"
    };

    onAdd(newTask); // Pass the new task to the parent
    resetForm(); // Reset the form fields after submission
  };

  const resetForm = () => {
    setTitle("");
    setAssignedTo("");
    setPriority("Low");
    setStatus("In Progress");
  };

  return (
    <Box>
      {/* Task Title Field */}
      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      {/* Assigned To Field (Dropdown, excluding the logged-in user) */}
      <TextField
        select
        label="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <MenuItem key={index} value={user.firstname}>
              {user.firstname}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            No available users
          </MenuItem>
        )}
      </TextField>

      {/* Priority Dropdown */}
      <TextField
        select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </TextField>

      {/* Status Dropdown */}
      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ marginTop: 2 }}
      >
        {task ? "Update Task" : "Add Task"}
      </Button>

      {/* Snackbar for Error Messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={errorMessage}
      />
    </Box>
  );
};

export default TaskForm;
