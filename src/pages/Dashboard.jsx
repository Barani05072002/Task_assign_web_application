import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Card, CardContent, Typography, Grid, IconButton, AppBar, Toolbar } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
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
        main: darkMode ? "#8e44ad" : "#6c63ff",
      },
      secondary: {
        main: darkMode ? "#ff7675" : "#f39c12",
      },
      background: {
        default: darkMode ? "#2c3e50" : "#ecf0f1",
        paper: darkMode ? "#34495e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: 14,
      h5: {
        fontSize: 20,
        fontWeight: 600,
      },
      body1: {
        fontSize: 16,
      },
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
          background: darkMode
            ? "linear-gradient(135deg, #2c3e50, #34495e)"
            : "linear-gradient(135deg, #6c63ff, #f39c12)",
          color: darkMode ? "#ecf0f1" : "#2c3e50",
        }}
      >
        {/* AppBar */}
        <AppBar position="sticky" sx={{ background: "transparent", boxShadow: "none" }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleToggleDarkMode}>
              {darkMode ? <WbSunnyIcon /> : <NightlightIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Grid container sx={{ flex: 1, height: "100%" }}>
          {/* Left Section: Task List */}
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              height: "100%",
              overflowY: "auto",
              padding: 2,
              backgroundColor: darkMode ? "#34495e" : "#ffffff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
                boxShadow: `0 4px 10px ${darkMode ? "#8e44ad" : "#6c63ff"}`,
              }}
            >
              +
            </Button>
          </Grid>

          {/* Right Section: Task Details */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              height: "100%",
              padding: 2,
              overflowY: "auto",
              backgroundColor: darkMode ? "#2c3e50" : "#ffffff",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            {selectedTask ? (
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
                  <Typography variant="h5" gutterBottom>
                    Task Details
                  </Typography>
                  <Typography><strong>Title:</strong> {selectedTask.title}</Typography>
                  <Typography><strong>Assigned By:</strong> {selectedTask.assignedBy}</Typography>
                  <Typography><strong>Assigned To:</strong> {selectedTask.assignedTo}</Typography>
                  <Typography><strong>Priority:</strong> {selectedTask.priority}</Typography>
                  <Typography><strong>Status:</strong> {selectedTask.status}</Typography>
                </CardContent>
              </Card>
            ) : (
              <Typography>Select a task to view details</Typography>
            )}
          </Grid>
        </Grid>

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
