import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    // Validate input
    if (!email || !password) {
      setSnackbar({ open: true, message: "Both email and password are required.", severity: "error" });
      setLoading(false);
      return;
    }

    // Simulate fetching user data
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === email);

    if (!existingUser) {
      setSnackbar({ open: true, message: "User does not exist. Please sign up.", severity: "error" });
      setLoading(false);
      return;
    }

    if (existingUser.password !== password) {
      setSnackbar({ open: true, message: "Incorrect password. Please try again.", severity: "error" });
      setLoading(false);
      return;
    }

    // Successful login
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify(existingUser));
    setSnackbar({ open: true, message: "Login successful! Redirecting to the dashboard...", severity: "success" });

    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #ff6f61, #3f51b5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          padding: 4,
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& fieldset": { borderColor: "#ddd" },
                "&:hover fieldset": { borderColor: "#3f51b5" },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& fieldset": { borderColor: "#ddd" },
                "&:hover fieldset": { borderColor: "#3f51b5" },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              marginTop: "20px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#304ffe" },
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 2, fontSize: "14px", color: "#555" }}
        >
          Don't have an account?{" "}
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate("/signup")}
            sx={{ textTransform: "none", padding: 0, minWidth: "auto" }}
          >
            Sign Up
          </Button>
        </Typography>

        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Login;
