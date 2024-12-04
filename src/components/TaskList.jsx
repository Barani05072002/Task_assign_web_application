import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit"; // Import Edit Icon
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

const TaskList = React.memo(({ tasks = [], onDelete, onApprove, onEdit, onRowClick, selectedTaskId }) => {
  const handleApprove = (task) => {
    // If task status is "Completed", revert to previous status
    if (task.status === "Completed") {
      onApprove(task.id, task.previousStatus); // Assuming `onApprove` can accept both ID and the previous status
    } else {
      onApprove(task.id, "Completed"); // Mark as completed
    }
  };

  return (
    <div style={{ margin: 0, overflow: "hidden" }}> {/* Set outer margin to 0 */}
      <TableContainer sx={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Assigned By
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Assigned To
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Priority
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow
                  key={task.id}
                  onClick={() => onRowClick(task)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedTaskId === task.id ? "#e3f2fd" : "white",
                    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: selectedTaskId === task.id ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : "none",
                  }}
                  onMouseEnter={(e) => (e.target.closest("tr").style.backgroundColor = "#f5f5f5")}
                  onMouseLeave={(e) => (e.target.closest("tr").style.backgroundColor = selectedTaskId === task.id ? "#e3f2fd" : "white")}
                >
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.assignedBy}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor: task.priority === "High" ? "red" : task.priority === "Medium" ? "orange" : "green",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                      }}
                    >
                      {task.priority}
                    </Box>
                  </TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Task">
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(task);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Approve Task">
                      <IconButton
                        color="success"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(task); // Use the new approve handler
                        }}
                      >
                        {task.status === "Completed" ? <DoNotDisturbOnIcon /> : <CheckCircleOutlineIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Task">
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(task.id);
                        }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No tasks available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default TaskList;
