import TrainManagement from "./TrainManagement";
import ScheduleManagement from "./ScheduleManagement";
import BookingManagement from "./BookingManagement";
import { useState, useEffect } from "react";
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
  Grid,
  Container,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrainIcon from "@mui/icons-material/Train";
import SettingsIcon from "@mui/icons-material/Settings";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookIcon from '@mui/icons-material/Book';
import { BarChart, DoughnutChart, LineChart, StatCard } from "./components/Charts";
import { dashboardService } from "./service/dashboardService";

const drawerWidth = 240;

function AdminDashboard() {
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [dashboardData, setDashboardData] = useState({
    stats: { totalTrains: 0, totalSchedules: 0, totalSeats: 0, averageTicketPrice: 0 },
    trainsByRoute: { labels: [], data: [] },
    scheduleUtilization: { labels: [], data: [] },
    priceDistribution: { labels: [], data: [] },
    monthlyTrends: { labels: [], data: [] }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedPage === "Dashboard") {
      fetchDashboardData();
    }
  }, [selectedPage]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [stats, trainsByRoute, scheduleUtilization, priceDistribution, monthlyTrends] = await Promise.all([
        dashboardService.getDashboardStats(),
        dashboardService.getTrainsByRoute(),
        dashboardService.getScheduleUtilization(),
        dashboardService.getTicketPriceDistribution(),
        dashboardService.getMonthlyScheduleTrends()
      ]);

      setDashboardData({
        stats,
        trainsByRoute,
        scheduleUtilization,
        priceDistribution,
        monthlyTrends
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Bookings", icon: <BookIcon /> },
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
          <Container maxWidth="xl">
            <Typography variant="h4" gutterBottom>
              Dashboard Overview
            </Typography>
            
            {loading ? (
              <Typography>Loading dashboard data...</Typography>
            ) : (
              <>
                {/* Statistics Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                      title="Total Trains" 
                      value={dashboardData.stats.totalTrains}
                      subtitle="Active trains in system"
                      color="#1976d2"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                      title="Total Schedules" 
                      value={dashboardData.stats.totalSchedules}
                      subtitle="Scheduled trips"
                      color="#388e3c"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                      title="Total Seats" 
                      value={dashboardData.stats.totalSeats}
                      subtitle="Available seat capacity"
                      color="#f57c00"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                      title="Avg. Ticket Price" 
                      value={`Rs. ${dashboardData.stats.averageTicketPrice.toFixed(2)}`}
                      subtitle="Average price per ticket"
                      color="#7b1fa2"
                    />
                  </Grid>
                </Grid>

                {/* Charts */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <BarChart 
                      title="Trains by Route"
                      data={{
                        labels: dashboardData.trainsByRoute.labels,
                        datasets: [{
                          label: 'Number of Trains',
                          data: dashboardData.trainsByRoute.data,
                          backgroundColor: 'rgba(25, 118, 210, 0.8)',
                          borderColor: 'rgba(25, 118, 210, 1)',
                          borderWidth: 1
                        }]
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <DoughnutChart 
                      title="Seat Utilization"
                      data={{
                        labels: dashboardData.scheduleUtilization.labels,
                        datasets: [{
                          data: dashboardData.scheduleUtilization.data,
                          backgroundColor: [
                            'rgba(56, 142, 60, 0.8)',
                            'rgba(245, 124, 0, 0.8)'
                          ],
                          borderColor: [
                            'rgba(56, 142, 60, 1)',
                            'rgba(245, 124, 0, 1)'
                          ],
                          borderWidth: 1
                        }]
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <BarChart 
                      title="Ticket Price Distribution"
                      data={{
                        labels: dashboardData.priceDistribution.labels,
                        datasets: [{
                          label: 'Number of Trains',
                          data: dashboardData.priceDistribution.data,
                          backgroundColor: 'rgba(123, 31, 162, 0.8)',
                          borderColor: 'rgba(123, 31, 162, 1)',
                          borderWidth: 1
                        }]
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <LineChart 
                      title="Monthly Schedule Trends"
                      data={{
                        labels: dashboardData.monthlyTrends.labels,
                        datasets: [{
                          label: 'Schedules',
                          data: dashboardData.monthlyTrends.data,
                          borderColor: 'rgba(245, 124, 0, 1)',
                          backgroundColor: 'rgba(245, 124, 0, 0.2)',
                          tension: 0.4,
                          fill: true
                        }]
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Container>
        )}

  {selectedPage === "Bookings" && <BookingManagement />}

  {selectedPage === "Trains" && <TrainManagement />}

  {selectedPage === "Train Schedule" && <ScheduleManagement />}

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
