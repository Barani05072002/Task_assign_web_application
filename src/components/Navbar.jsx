import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, Box, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [users, setUsers] = useState([]); // Store users in state
  const navigate = useNavigate();
  
  // Get the current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  // Fetch users from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Box>
          {currentUser && (
            <Typography
              variant="body1"
              sx={{
                display: "inline",
                marginRight: 2,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Welcome, {currentUser.firstname || "User"}
            </Typography>
          )}
          <Button
            color="inherit"
            onClick={handleOpenMenu}
            sx={{ marginRight: 2 }}
          >
            Show All Users
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
          >
            {users.length > 0 ? (
              users.map((user) => (
                user.email !== currentUser?.email && (
                  <MenuItem key={user.id} onClick={handleCloseMenu}>
                    {user.firstname} {user.lastname}
                  </MenuItem>
                )
              ))
            ) : (
              <MenuItem disabled>No users found</MenuItem>
            )}
          </Menu>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
