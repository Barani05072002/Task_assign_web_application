import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate(); // Initialize navigate
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [dialogMessage, setDialogMessage] = useState(''); // State to store the message for the dialog
  const [successSnackbar, setSuccessSnackbar] = useState(false); // State to show success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    const { firstname, lastname, email, password, role } = formData;
    if (!firstname || !lastname || !email || !password || !role) {
      setDialogMessage('All fields are required!');
      setOpenDialog(true); // Open the dialog if any field is empty
      return; // Prevent form submission
    }

    // Check if the user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.email === formData.email);

    if (userExists) {
      setDialogMessage('User already exists!');
      setOpenDialog(true); // Open the dialog if user exists
    } else {
      // If user does not exist, save the user and proceed
      const newUser = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      // Save the user to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Reset form data after successful registration
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: '',
      });

      // Show success message
      setSuccessSnackbar(true);

      // Redirect to login page after a delay
      setTimeout(() => navigate('/'), 2000);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handleCloseSnackbar = () => {
    setSuccessSnackbar(false); // Close the Snackbar
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        padding: 0,
        background: 'linear-gradient(135deg, #ff6f61, #3f51b5)', // Gradient background
        fontFamily: '"Roboto", sans-serif', // Apply font family globally
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          width: '100%',
          padding: 4,
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: 'white',
          opacity: 0.9,
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#1976d2' }}>
          Sign Up
        </Typography>
        <TextField
          label="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '20px',
              backgroundColor: '#f9f9f9',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
            },
          }}
        />
        <TextField
          label="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '20px',
              backgroundColor: '#f9f9f9',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
            },
          }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '20px',
              backgroundColor: '#f9f9f9',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
            },
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '20px',
              backgroundColor: '#f9f9f9',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
            },
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            variant="outlined"
            sx={{
              borderRadius: '20px',
              backgroundColor: '#f9f9f9',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
            }}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Employer">Employer</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            marginTop: 2,
            padding: '10px 20px',
            borderRadius: '20px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Sign Up
        </Button>

        {/* Link to login page */}
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Already have an account?{' '}
          <Link href="/" sx={{ color: '#1976d2', textDecoration: 'none' }}>
            Login here
          </Link>
        </Typography>
      </Box>

      {/* Dialog for error message */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={successSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          New user created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUpForm;
