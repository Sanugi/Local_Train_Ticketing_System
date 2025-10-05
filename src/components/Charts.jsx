import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Paper, Typography, Box } from '@mui/material';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Bar Chart Component
export const BarChart = ({ title, data, options = {} }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    ...options,
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: '340px' }}>
        <Bar data={data} options={defaultOptions} />
      </Box>
    </Paper>
  );
};

// Doughnut Chart Component
export const DoughnutChart = ({ title, data, options = {} }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: false,
      },
    },
    ...options,
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: '340px' }}>
        <Doughnut data={data} options={defaultOptions} />
      </Box>
    </Paper>
  );
};

// Line Chart Component
export const LineChart = ({ title, data, options = {} }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    ...options,
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: '340px' }}>
        <Line data={data} options={defaultOptions} />
      </Box>
    </Paper>
  );
};

// Statistics Card Component
export const StatCard = ({ title, value, subtitle, color = '#1976d2' }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        textAlign: 'center',
        background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
        border: `1px solid ${color}33`
      }}
    >
      <Typography variant="h4" sx={{ color: color, fontWeight: 'bold', mb: 1 }}>
        {value}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
};