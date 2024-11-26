import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Sidenavbar from "../../../components/Sidenavbar";
import ApiInstance from "../../../ApiInstance";

const RoleBasedListPages = ({ roleFilter }) => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null); // For error messages
  const [success, setSuccess] = useState(null); // For success messages


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await ApiInstance.get("/api/getEmployees");
        console.log("API Response:", response.data);

        // Ensure data is an array and filter by position
        if (Array.isArray(response.data)) {
          const filteredEmployees = response.data.filter(
            (employee) =>
              employee.role?.toLowerCase().trim() === roleFilter.toLowerCase().trim()
          );

          console.log("Filtered Employees:", filteredEmployees);
          setEmployees(filteredEmployees);
        } else {
          throw new Error("Unexpected response format: Expected an array.");
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to fetch employees. Please try again later.");
      }
    };

    fetchEmployees();
  }, [roleFilter]);

  // Handle Delete Action
  const handleDelete = async (employeeId) => {
    console.log("handledelete received employeeId", employeeId);
    if (!employeeId) {
      setError("Invalid employee ID.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await ApiInstance.delete(`/api/deleteEmployee/${employeeId}`);
        if (response.status === 200) {
          setEmployees((prev) =>
            prev.filter((employee) => employee.employeeId !== employeeId)
          );
          setSuccess("Employee deleted successfully.");
        } else {
          setError("Failed to delete employee. Please try again later.");
        }
      } catch (err) {
        console.error("Error deleting employee:", err);
        setError("An error occurred. Please try again.");
      }
    }
  };

  // Handle Edit Action
  const handleEdit = (employeeId) => {
    if (!employeeId) {
      setError("Invalid employee ID.");
      return;
    }
    console.log("handleEdit received employeeId", employeeId);
    // Navigate to the edit page with the employee ID
    navigate(`/addEmployee/${employeeId}`);
  };

  return (
    <Box>
      <Sidenavbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <h1>{roleFilter} List</h1>

        {/* Snackbar for error messages */}
        {error && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setError(null)}
          >
            <Alert
              onClose={() => setError(null)}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}

        {/* Snackbar for success messages */}
        {success && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setSuccess(null)}
          >
            <Alert
              onClose={() => setSuccess(null)}
              severity="success"
              sx={{ width: "100%" }}
            >
              {success}
            </Alert>
          </Snackbar>
        )}

        {/* Employee Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Employee Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Position</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.employeeId}>
                  <TableCell>{employee.employeeId}</TableCell>
                  <TableCell>{employee.fullName}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleEdit(employee.employeeId)}
                      color="primary"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(employee.employeeId)}
                      color="secondary"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default RoleBasedListPages;
