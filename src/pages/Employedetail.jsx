import React from "react";
import Sidenavbar from "../components/Sidenavbar"; // Assuming this is your main sidebar navigation (left)
import Sidebar from "../components/Sidebar"; // Import the Sidebar we created
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Employedetail() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* Left Sidenavbar */}
        <Sidenavbar />

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h1">Employee Detail</Typography>

          {/* Other employee-related content here */}
        </Box>

        {/* Right Sidebar */}
        <Sidebar />
      </Box>
    </>
  );
}

export default Employedetail;
