import AddTrain from "./AddTrain";
import AddSchedule from "./AddSchedule";
import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  CssBaseline,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrainIcon from "@mui/icons-material/Train";
import SettingsIcon from "@mui/icons-material/Settings";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const drawerWidth = 240;

function AdminDashboard() {
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Trains", icon: <TrainIcon /> },
    { text: "Train Schedule", icon: <AccessTimeIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => setSelectedPage(item.text)}
                  selected={selectedPage === item.text}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <Toolbar />

        {selectedPage === "Dashboard" && (
          <>
            <Typography variant="h4">Dashboard</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Welcome to the Admin Dashboard!
            </Typography>
          </>
        )}

        {selectedPage === "Trains" && <AddTrain />}

        {selectedPage === "Train Schedule" && <AddSchedule />}

        {selectedPage === "Settings" && (
          <>
            <Typography variant="h4">Settings</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Configure system settings here.
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
