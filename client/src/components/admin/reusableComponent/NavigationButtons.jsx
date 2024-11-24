import React from "react";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavigationButtons = ({ buttons }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Grid container justifyContent="center" spacing={10} sx={{ mb: 3 }}>
      {buttons.map((button, index) => (
        <Grid item key={index}>
          <Button
            style={{height:"38px", marginTop:"8px"}}
            variant="contained" 
            color={button.color}
            onClick={() => handleNavigation(button.path)}
          >
            {button.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default NavigationButtons;
