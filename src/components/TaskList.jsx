import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const TaskList = ({ tasks, onDelete }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><strong>Task Title</strong></TableCell>
          <TableCell><strong>Assigned By</strong></TableCell>
          <TableCell><strong>Assigned To</strong></TableCell>
          <TableCell><strong>Priority</strong></TableCell>
          <TableCell><strong>Actions</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.assignedBy}</TableCell>
            <TableCell>{task.assignedTo}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TaskList;
