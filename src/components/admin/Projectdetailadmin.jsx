import React from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import DownloadIcon from "@mui/icons-material/Download";
import * as XLSX from "xlsx";

// Custom Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  borderBottom: "none",
  padding: theme.spacing(1),
}));

const StatusButton = styled("div")(({ status }) => ({
  backgroundColor:
    status === "Completed"
      ? "#33817E" // Completed color
      : status === "Pending"
      ? "#9C454F" // Pending color
      : status === "InProgress" // Correct spelling
      ? "#9473F1" // InProgress color
      : "#e0e0e0", // Default color for other statuses
  color: "#FFFFFF", // Use white text for all statuses
  padding: "4px 10px",
  borderRadius: "15px",
  fontSize: "0.9rem",
  textAlign: "center",
  width: "fit-content",
}));

const ProgressWithLabel = ({ value }) => {
  // Define color based on value
  let progressColor = "";
  if (value > 85) {
    progressColor = "#33817E"; // Above 85
  } else if (value >= 50 && value <= 84) {
    progressColor = "#9473F1"; // Between 50 and 84
  } else {
    progressColor = "#9C454F"; // Below 50
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <LinearProgress
        variant="determinate"
        value={value}
        style={{
          width: "80%",
          marginRight: 8,
          height: 10,
          borderRadius: 5,
          backgroundColor: "#e0e0e0", // Default background color
        }}
        sx={{
          "& .MuiLinearProgress-bar": {
            backgroundColor: progressColor, // Use calculated color
          },
        }}
      />
      <Typography
        variant="body2"
        style={{ minWidth: 35 }}
      >{`${value}%`}</Typography>
    </div>
  );
};

const ProjectDetailsAdmin = () => {
  const projectData = [
    {
      name: "News app",
      lead: "Supriya",
      progress: 53,
      status: "InProgress", // Correct spelling
      dueDate: "06 June 2024",
    },
    {
      name: "ecommerce",
      lead: "Aakanksha",
      progress: 24,
      status: "Pending",
      dueDate: "16 Aug 2025",
    },
    {
      name: "weather",
      lead: "Kajal",
      progress: 86,
      status: "Completed",
      dueDate: "30 May 2023",
    },
    {
      name: "world tour",
      lead: "Asma",
      progress: 51,
      status: "InProgress", // Correct spelling
      dueDate: "11 June 2024",
    },
  ];

  // Function to export the table data to an Excel sheet
  const exportToExcel = () => {
    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(
      projectData.map((project) => ({
        "Project Name": project.name,
        "Project Lead": project.lead,
        Progress: project.progress + "%",
        Status: project.status,
        "Due Date": project.dueDate,
      }))
    );

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Project Details");

    // Export to Excel file
    XLSX.writeFile(wb, "Project_Details.xlsx");
  };

  return (
    <Container>
      <Box
        component={Paper}
        sx={{
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f7f7f7",
          marginTop: 5,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", color: "#3F51B5" }}
          >
            Project Details:
          </Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: "#D1C4E9", color: "#8E24AA" }}
            startIcon={<DownloadIcon />}
            onClick={exportToExcel} // Add export function on click
          >
            Export Report
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Project Name</StyledTableCell>
                <StyledTableCell>Project Lead</StyledTableCell>
                <StyledTableCell>Progress</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Due Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectData.map((project) => (
                <TableRow key={project.name}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.lead}</TableCell>
                  <TableCell>
                    <ProgressWithLabel value={project.progress} />
                  </TableCell>
                  <TableCell>
                    <StatusButton status={project.status}>
                      {project.status}
                    </StatusButton>
                  </TableCell>
                  <TableCell>{project.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ProjectDetailsAdmin;
