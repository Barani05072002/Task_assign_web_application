import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Container } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt"; // Icon for completed tasks
import PendingActionsIcon from "@mui/icons-material/PendingActions"; // Icon for pending tasks
import AssignmentIcon from "@mui/icons-material/Assignment"; // Icon for total tasks

const Dashboard = () => {
  const [taskCounts, setTaskCounts] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    // Fetch tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const completedTasks = tasks.filter(task => task.status === "Completed").length;
    const pendingTasks = tasks.filter(task => task.status === "Pending").length;

    setTaskCounts({
      totalTasks: tasks.length,
      completedTasks,
      pendingTasks,
    });
  }, []); // Run on component mount

  const { totalTasks, completedTasks, pendingTasks } = taskCounts;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff6f61, #3f51b5)", // Gradient background for the whole component
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          Task Summary
        </Typography>
        <Grid container spacing={4}>
          {/* Total Tasks */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                borderRadius: "12px",
                padding: 3,
                textAlign: "center",
                backgroundColor: "#f1c40f", // Gold for Total Tasks
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <AssignmentIcon sx={{ fontSize: 50, color: "#2c3e50", marginBottom: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                Total Tasks
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                {totalTasks}
              </Typography>
            </Box>
          </Grid>

          {/* Completed Tasks */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                borderRadius: "12px",
                padding: 3,
                textAlign: "center",
                backgroundColor: "#2ecc71", // Green for Completed Tasks
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <TaskAltIcon sx={{ fontSize: 50, color: "white", marginBottom: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1, color: "white" }}>
                Completed Tasks
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "white" }}>
                {completedTasks}
              </Typography>
            </Box>
          </Grid>

          {/* Pending Tasks */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                borderRadius: "12px",
                padding: 3,
                textAlign: "center",
                backgroundColor: "#e74c3c", // Red for Pending Tasks
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <PendingActionsIcon sx={{ fontSize: 50, color: "white", marginBottom: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1, color: "white" }}>
                Pending Tasks
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "white" }}>
                {pendingTasks}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
