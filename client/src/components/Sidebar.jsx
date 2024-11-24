import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  Avatar,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CoffeeIcon from "@mui/icons-material/Coffee";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 300, padding: 2 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* Action Buttons */}
      <List>
        <ListItem button>
          <AssignmentIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="New Task" />
        </ListItem>
        <ListItem button>
          <CoffeeIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Break" />
        </ListItem>
        <ListItem button>
          <ExitToAppIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />

      {/* Individual Chat Section */}
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Team
      </Typography>
      <List>
        <ListItem>
          <Avatar alt="Team Creative" />
          <ListItemText primary="Team Creative" secondary="10:36am" />
        </ListItem>
        <ListItem>
          <Avatar alt="Team Design" />
          <ListItemText primary="Team Design" secondary="10:36am" />
        </ListItem>
      </List>
      <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
        Individual
      </Typography>
      <List>
        <ListItem>
          <Avatar alt="Ravikumar" />
          <ListItemText primary="Ravikumar" secondary="11:26am" />
        </ListItem>
        <ListItem>
          <Avatar alt="Suresh" />
          <ListItemText primary="Suresh" secondary="11:10am" />
        </ListItem>
        <ListItem>
          <Avatar alt="Dharmendra" />
          <ListItemText primary="Dharmendra" secondary="Team Lead" />
        </ListItem>
      </List>

      {/* "Type Here" Input */}
      <Box sx={{ position: "fixed", bottom: 20, width: "80%", paddingLeft: 1 }}>
        <TextField fullWidth label="Type here" variant="outlined" />
      </Box>
    </Box>
  );

  return (
    <>
      {/* Open Sidebar Button */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ position: "fixed", top: 10, right: 10 }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
