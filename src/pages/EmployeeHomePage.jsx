import React from "react";
import { Typography, Box } from "@mui/material";

const EmployeeHomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #ff6f61, #3f51b5)",
        color: "white",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome, Employer!
      </Typography>
      <Typography variant="h5">
        This is the Employee Home Page.
      </Typography>
    </Box>
  );
};

export default EmployeeHomePage;
