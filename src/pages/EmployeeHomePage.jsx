import React, { useState, useEffect } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "../components/Navbar";

const EmployeeHomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
    // Fetch tasks from localStorage and filter them for the current user
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const userTasks = allTasks.filter((task) => task.assignedTo === currentUser?.firstname);
    setTasks(userTasks);
  }, [currentUser]);

  return (
    <ThemeProvider theme={currentTheme}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#e3f2fd",
          margin: 0,
        }}
      >
        {/* Navbar Component */}
        <Navbar darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: 2,
          }}
        >
          {tasks.length === 0 ? (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No tasks assigned to you yet.
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="h6">Title</Typography></TableCell>
                    <TableCell><Typography variant="h6">Assigned By</Typography></TableCell>
                    <TableCell><Typography variant="h6">Priority</Typography></TableCell>
                    <TableCell><Typography variant="h6">Status</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.assignedBy}</TableCell>
                      <TableCell>{task.priority}</TableCell>
                      <TableCell>{task.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EmployeeHomePage;
