import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = ({ users, onFilterTasks, onShowAllTasks, currentUser }) => {
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Task Assignment App</Typography>
        <div>
          {users.map((user) => (
            <Button
              key={user.id}
              color={user.id === currentUser ? "secondary" : "inherit"}
              onClick={() => onFilterTasks(user.id)}
            >
              {user.email}
            </Button>
          ))}
          <Button color="inherit" onClick={onShowAllTasks}>
            Show All Tasks
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
