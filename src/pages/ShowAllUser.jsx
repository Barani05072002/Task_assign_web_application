import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const ShowAllUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: "center", fontWeight: "bold", color: "#e74c3c", padding: "20px" }}>
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
