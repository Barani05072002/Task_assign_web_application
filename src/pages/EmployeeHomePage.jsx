import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "../components/Navbar";

const EmployeeHomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [clickedButtons, setClickedButtons] = useState({});

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
    },
  });

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const userTasks = allTasks.filter(
      (task) => task.assignedTo === currentUser?.firstname
    );
    setTasks(userTasks);
  }, [currentUser]);

  const raiseRequest = (taskId, request) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedAllTasks = allTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, request };
      }
      return task;
    });

    localStorage.setItem("tasks", JSON.stringify(updatedAllTasks));

    setClickedButtons((prev) => ({ ...prev, [taskId]: request }));
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
        <Box sx={{ padding: 2 }}>
          {tasks.length === 0 ? (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No tasks assigned to you yet.
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Title</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Assigned By</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Priority</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Status</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Actions</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.assignedBy}</TableCell>
                      <TableCell>{task.priority}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>
                        <Tooltip title="Request Pending">
                          <Button
                            variant="outlined"
                            color="warning"
                            disabled={clickedButtons[task.id] === "Request for Pending"}
                            onClick={() => raiseRequest(task.id, "Request for Pending")}
                            sx={{
                              mr: 1,
                              backgroundColor:
                                clickedButtons[task.id] === "Request for Pending"
                                  ? "#ffe0b2"
                                  : "inherit",
                            }}
                          >
                            Request Pending
                          </Button>
                        </Tooltip>
                        <Tooltip title="Request Complete">
                          <Button
                            variant="outlined"
                            color="success"
                            disabled={clickedButtons[task.id] === "Request for Completed"}
                            onClick={() => raiseRequest(task.id, "Request for Completed")}
                            sx={{
                              backgroundColor:
                                clickedButtons[task.id] === "Request for Completed"
                                  ? "#c8e6c9"
                                  : "inherit",
                            }}
                          >
                            Request Complete
                          </Button>
                        </Tooltip>
                      </TableCell>
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
