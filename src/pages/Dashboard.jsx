import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { Button, Modal, Box } from "@mui/material";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulated logged-in user
  const loggedInUser = "admin"; // Replace with actual user from login system

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleAddTask = (task) => {
    const newTask = { id: Date.now(), ...task };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <TaskList tasks={tasks} onDelete={handleDeleteTask} />

      <Button
        variant="contained"
        color="primary"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
        onClick={() => setIsModalOpen(true)}
      >
        Create Task
      </Button>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h3>Create Task</h3>
          <TaskForm onAdd={handleAddTask} loggedInUser={loggedInUser} />
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
