import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ShowAllUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const employers = storedUsers.filter((user) => user.role === "Employer");
    setUsers(employers);
  }, []);
  

  const handleDeleteUser = (userId) => {
    // Remove user from the list
    const updatedUsers = users.filter((user) => user.email !== userId.email);
    setUsers(updatedUsers);

    // Update localStorage with the new user list
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <Paper sx={{ width: "100%", height: "100vh", overflow: "hidden", margin: 0, backgroundColor: "#f7f7f7" }}>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", margin: "20px 0", color: "#2c3e50" }}>
        User Details
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          height: "calc(100vh - 120px)",
          overflowY: "auto",
          padding: 0,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Table sx={{ tableLayout: "auto", minWidth: "600px" }}>
          <TableHead sx={{ backgroundColor: "#2c3e50" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f1f1f1",
                    },
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#ecf0f1", // Alternate row colors
                  }}
                >
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>{user.firstname}</TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>{user.lastname}</TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>{user.email}</TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>{user.role}</TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                    <IconButton color="error" onClick={() => handleDeleteUser(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center", fontWeight: "bold", color: "#e74c3c", padding: "20px" }}>
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ShowAllUser;
