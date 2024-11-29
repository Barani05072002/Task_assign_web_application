import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Card, CardContent, Typography, Grid, IconButton, AppBar, Toolbar } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Sun Icon for light mode
import NightlightIcon from "@mui/icons-material/Nightlight"; // Moon Icon for dark mode
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const loggedInUser = "JohnDoe";

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const currentTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#303030" : "#fafafa",
        paper: darkMode ? "#424242" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  });

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
    if (selectedTask?.id === taskId) setSelectedTask(null);
  };

  const handleApproveTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "Approved" } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleRowClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseDetails = () => {
    setSelectedTask(null);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: darkMode ? "#303030" : "#fafafa",
        }}
      >
        {/* AppBar */}
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleToggleDarkMode}>
              {darkMode ? <WbSunnyIcon /> : <NightlightIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Left Section: Task List */}
          <Box
            sx={{
              flex: 2,
              overflowY: "auto",
              padding: 2,
              backgroundColor: darkMode ? "#424242" : "#f4f4f4",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onApprove={handleApproveTask}
              onRowClick={handleRowClick}
              selectedTaskId={selectedTask?.id}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsModalOpen(true)}
              sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                borderRadius: "50%",
                width: 56,
                height: 56,
                zIndex: 1000,
              }}
            >
              +
            </Button>
          </Box>

          {/* Right Section: Task Details */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: darkMode ? "#303030" : "#ffffff",
              padding: 2,
              boxShadow: darkMode ? "0px 4px 15px rgba(255, 255, 255, 0.1)" : "0px 4px 15px rgba(0, 0, 0, 0.1)",
              display: selectedTask ? "block" : "none",
              position: "relative",
            }}
          >
            {selectedTask && (
              <Card>
                <IconButton
                  color="error"
                  onClick={handleCloseDetails}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <CardContent>
                  <Typography variant="h5">Task Details</Typography>
                  <Typography><strong>Title:</strong> {selectedTask.title}</Typography>
                  <Typography><strong>Assigned By:</strong> {selectedTask.assignedBy}</Typography>
                  <Typography><strong>Assigned To:</strong> {selectedTask.assignedTo}</Typography>
                  <Typography><strong>Priority:</strong> {selectedTask.priority}</Typography>
                  <Typography><strong>Status:</strong> {selectedTask.status}</Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>

        {/* Task Form Modal */}
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
              borderRadius: 2,
            }}
          >
            <IconButton
              color="error"
              onClick={() => setIsModalOpen(false)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom>
              Create Task
            </Typography>
            <TaskForm onAdd={handleAddTask} loggedInUser={loggedInUser} />
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
