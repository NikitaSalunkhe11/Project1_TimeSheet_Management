import React, { useState, useEffect } from "react";
import Sidenavbar from "../../components/Sidenavbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Label,
} from "recharts";
import ProjectDetailsAdmin from "../../components/admin/Projectdetailadmin";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Sample datasets for different views
const weekData = [10, 90, 30, 60, 50, 40, 50];
const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthData = [60, 70, 55, 85, 95, 65, 75, 90, 100, 75, 85, 90];
const yearData2020 = [
  800, 900, 850, 1000, 950, 800, 900, 950, 1000, 850, 900, 950,
];
const yearData2021 = [
  900, 950, 850, 1100, 980, 840, 920, 960, 1050, 820, 870, 890,
];
const yearData2022 = [
  950, 1050, 900, 1200, 1100, 890, 980, 1030, 1150, 950, 980, 1050,
];
const yearData2023 = [
  1000, 1100, 950, 1250, 1200, 950, 1050, 1100, 1200, 1000, 1100, 1150,
];
const allYearsData = [
  5000, 5200, 4800, 6000, 5800, 5500, 6100, 6500, 6200, 5700, 6000, 6200,
];

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function Admindashboard() {
  const [view, setView] = useState("Month");
  const [year, setYear] = useState(2020);
  const [chartData, setChartData] = useState(monthData);
  const [chartLabels, setChartLabels] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayValue, setDisplayValue] = useState("55");

  const handleViewChange = (newView) => {
    setView(newView);
    if (newView === "Week") {
      setChartData(weekData);
      setChartLabels(weekLabels);
    } else if (newView === "Month") {
      setChartData(monthData);
      setChartLabels([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]);
    } else if (newView === "Year") {
      setYear(2020);
      setChartData(yearData2020);
      setChartLabels([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]);
    } else if (newView === "All") {
      setChartData(allYearsData);
      setChartLabels([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]);
    }
  };

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
    if (selectedYear === 2020) {
      setChartData(yearData2020);
    } else if (selectedYear === 2021) {
      setChartData(yearData2021);
    } else if (selectedYear === 2022) {
      setChartData(yearData2022);
    } else if (selectedYear === 2023) {
      setChartData(yearData2023);
    }
  };

  // Circular progress data for the right section
  const data = [
    { name: "Complete", value: 55 },
    { name: "Pending", value: 35 },
    { name: "Not Started", value: 10 },
  ];

  // Define colors for the pie chart segments
  const COLORS = ["#4caf50", "#ff9800", "#f44336"];

  // Add a function to handle pie chart click events
  const handlePieClick = (entry) => {
    setActiveIndex(entry.index);
    // Set the displayed value as both the name and percentage
    setDisplayValue(`${entry.payload.name} ${entry.payload.value}`);
  };

  // Effect to set default display value when the component mounts
  useEffect(() => {
    setActiveIndex(0); // Set default active index to 0 (Complete)
    setDisplayValue(`${data[0].name} ${data[0].value}`); // Set the default display value
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      <Sidenavbar />
      <Grid container spacing={2} sx={{ backgroundColor: "#ECF1FA" }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Project Overview
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack buttons on small screens
                justifyContent: "flex-end",
                marginBottom: 2,
              }}
            >
              <ButtonGroup variant="contained" color="primary" sx={{ mb: 2 }}>
                <Button
                  onClick={() => handleViewChange("Week")}
                  variant={view === "Week" ? "contained" : "outlined"}
                >
                  Week
                </Button>
                <Button
                  onClick={() => handleViewChange("Month")}
                  variant={view === "Month" ? "contained" : "outlined"}
                >
                  Month
                </Button>
                <Button
                  onClick={() => handleViewChange("Year")}
                  variant={view === "Year" ? "contained" : "outlined"}
                >
                  Year
                </Button>
                <Button
                  onClick={() => handleViewChange("All")}
                  variant={view === "All" ? "contained" : "outlined"}
                >
                  All
                </Button>
              </ButtonGroup>
            </Box>

            {view === "Year" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column", // Stack buttons on small screens
                  justifyContent: "flex-end",
                  marginBottom: 2,
                }}
              >
                <ButtonGroup variant="outlined" color="secondary">
                  <Button
                    onClick={() => handleYearChange(2020)}
                    variant={year === 2020 ? "contained" : "outlined"}
                  >
                    2020
                  </Button>
                  <Button
                    onClick={() => handleYearChange(2021)}
                    variant={year === 2021 ? "contained" : "outlined"}
                  >
                    2021
                  </Button>
                  <Button
                    onClick={() => handleYearChange(2022)}
                    variant={year === 2022 ? "contained" : "outlined"}
                  >
                    2022
                  </Button>
                  <Button
                    onClick={() => handleYearChange(2023)}
                    variant={year === 2023 ? "contained" : "outlined"}
                  >
                    2023
                  </Button>
                </ButtonGroup>
              </Box>
            )}

            <Box sx={{ height: 400 }}>
              <Bar
                data={{
                  labels: chartLabels,
                  datasets: [
                    {
                      data: chartData,
                      backgroundColor: "rgba(153,102,255,0.6)",
                    },
                  ],
                }}
                options={options}
              />
            </Box>

            <Grid container spacing={2} sx={{ marginTop: 4 }}>
              <Grid item xs={6} sm={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                  <Typography variant="h6">12,721</Typography>
                  <Typography variant="body2">Number of Project</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                  <Typography variant="h6">32</Typography>
                  <Typography variant="body2">Managers</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                  <Typography variant="h6">1489</Typography>
                  <Typography variant="body2">Employes</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                  <Typography variant="h6">12185hr</Typography>
                  <Typography variant="body2">Working Hour</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              padding: 2,
              borderRadius: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, // Stack on small screens
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            {/* Left Side: Pie Chart */}
            <Box sx={{ width: "100%", mb: { xs: 2, sm: 0 } }}>
              {" "}
              {/* Full width on small screens */}
              <Typography
                variant="h6"
                gutterBottom
                textAlign="center"
                fontWeight="bold"
              >
                All Project
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    onClick={handlePieClick}
                    activeIndex={activeIndex}
                    activeShape={(props) => (
                      <Sector
                        {...props}
                        stroke="none" // Ensure no stroke is applied
                        fill={COLORS[props.index] || "#4caf50"} // Ensure correct color is applied from COLORS, with fallback to green
                      />
                    )}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index] || "#4caf50"} // Ensure "Complete" always defaults to green
                        stroke="none" // Prevent any outline or stroke color
                      />
                    ))}
                  </Pie>

                  {displayValue && (
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        fill: "#000",
                      }} // Ensure the text inside the pie is readable
                    >
                      {displayValue}
                    </text>
                  )}
                </PieChart>
              </ResponsiveContainer>
            </Box>

            {/* Right Side: Info about Project Completion */}
            <Box sx={{ width: "50%", textAlign: "left", ml: { xs: 0, sm: 2 } }}>
              <Typography variant="body1">
                <span style={{ color: COLORS[0] }}>●</span> Complete
              </Typography>
              <Typography variant="body1">
                <span style={{ color: COLORS[1] }}>●</span> Pending
              </Typography>
              <Typography variant="body1">
                <span style={{ color: COLORS[2] }}>●</span> Not Started
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} marginBottom={5}>
          <ProjectDetailsAdmin />
        </Grid>
      </Grid>
    </Box>
  );
}
