import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const TaskList = ({ tasks, onDelete, onApprove, onRowClick, selectedTaskId }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Assigned By</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              onClick={() => onRowClick(task)}
              style={{
                cursor: "pointer",
                backgroundColor: selectedTaskId === task.id ? "#f0f0f0" : "white",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
              onMouseLeave={(e) => e.target.style.backgroundColor = selectedTaskId === task.id ? "#f0f0f0" : "white"}
            >
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.assignedBy}</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="success"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    onApprove(task.id);
                  }}
                  title="Approve Task"
                >
                  <CheckCircleOutlineIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    onDelete(task.id);
                  }}
                  title="Delete Task"
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
