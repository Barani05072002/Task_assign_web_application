import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Container } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // New state for success indication
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    const { email, password } = formData;
    if (!email || !password) {
      setDialogMessage("Both fields are required!");
      setOpenDialog(true);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === formData.email);

    if (!existingUser) {
      setDialogMessage("User does not exist. Please sign up.");
      setOpenDialog(true);
      return;
    }

    if (existingUser.password !== formData.password) {
      setDialogMessage("Incorrect password. Please try again.");
      setOpenDialog(true);
      return;
    }

    // Set user authentication status and store the user
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify(existingUser));

    // Show success message before redirecting
    setIsSuccess(true);
    setDialogMessage("Login successful! Redirecting to dashboard...");
    setOpenDialog(true);

    // After a short delay, redirect to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  return (
    <div style={{
      height: '100vh',
      background: 'linear-gradient(135deg, #ff6f61, #3f51b5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Container maxWidth="xs" sx={{ padding: 4, backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <div className="login-container">
          <div className="login-form">
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
              Login
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#ddd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3f51b5',
                    },
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
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#ddd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3f51b5',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  marginTop: '20px',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#304ffe',
                  },
                }}
              >
                Login
              </Button>
            </form>
            <Typography variant="body2" align="center" sx={{ marginTop: 2, fontSize: '14px', color: '#555' }}>
              Don't have an account? <a href="/signup" style={{ color: '#3f51b5', textDecoration: 'none' }}>Sign Up</a>
            </Typography>
          </div>
        </div>

        {/* Dialog for error or success message */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{isSuccess ? "Success" : "Error"}</DialogTitle>
          <DialogContent>
            <Typography>{dialogMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default Login;
