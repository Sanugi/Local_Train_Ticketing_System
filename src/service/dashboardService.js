import axiosInstance from './axiosInstance';

export const dashboardService = {
  // Get dashboard statistics
  async getDashboardStats() {
    try {
      const [trainsRes, schedulesRes] = await Promise.all([
        axiosInstance.get('/trains'),
        axiosInstance.get('/schedules')
      ]);

      const trains = trainsRes.data.data || [];
      const schedules = schedulesRes.data.data || [];

      return {
        totalTrains: trains.length,
        totalSchedules: schedules.length,
        totalSeats: trains.reduce((sum, train) => sum + (train.seatCount || 0), 0),
        averageTicketPrice: trains.length > 0 
          ? trains.reduce((sum, train) => sum + (train.ticketPrice || 0), 0) / trains.length
          : 0
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        totalTrains: 0,
        totalSchedules: 0,
        totalSeats: 0,
        averageTicketPrice: 0
      };
    }
  },

  // Get train distribution by route
  async getTrainsByRoute() {
    try {
      const response = await axiosInstance.get('/trains');
      const trains = response.data.data || [];
      
      const routeData = {};
      trains.forEach(train => {
        const route = `${train.fromStation} - ${train.toStation}`;
        routeData[route] = (routeData[route] || 0) + 1;
      });

      return {
        labels: Object.keys(routeData),
        data: Object.values(routeData)
      };
    } catch (error) {
      console.error('Error fetching trains by route:', error);
      return { labels: [], data: [] };
    }
  },

  // Get schedule utilization (available vs occupied seats)
  async getScheduleUtilization() {
    try {
      const [trainsRes, schedulesRes] = await Promise.all([
        axiosInstance.get('/trains'),
        axiosInstance.get('/schedules')
      ]);

      const trains = trainsRes.data.data || [];
      const schedules = schedulesRes.data.data || [];

      // Create a map of train IDs to seat counts
      const trainSeats = {};
      trains.forEach(train => {
        trainSeats[train._id] = train.seatCount || 0;
      });

      let totalCapacity = 0;
      let totalAvailable = 0;

      schedules.forEach(schedule => {
        const capacity = trainSeats[schedule.trainId] || 0;
        const available = schedule.availableSeats || 0;
        totalCapacity += capacity;
        totalAvailable += available;
      });

      const occupiedSeats = totalCapacity - totalAvailable;

      return {
        labels: ['Available', 'Occupied'],
        data: [totalAvailable, occupiedSeats]
      };
    } catch (error) {
      console.error('Error fetching schedule utilization:', error);
      return { labels: ['Available', 'Occupied'], data: [0, 0] };
    }
  },

  // Get ticket price distribution
  async getTicketPriceDistribution() {
    try {
      const response = await axiosInstance.get('/trains');
      const trains = response.data.data || [];
      
      // Group trains by price ranges
      const priceRanges = {
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '400+': 0
      };

      trains.forEach(train => {
        const price = train.ticketPrice || 0;
        if (price <= 100) priceRanges['0-100']++;
        else if (price <= 200) priceRanges['101-200']++;
        else if (price <= 300) priceRanges['201-300']++;
        else if (price <= 400) priceRanges['301-400']++;
        else priceRanges['400+']++;
      });

      return {
        labels: Object.keys(priceRanges),
        data: Object.values(priceRanges)
      };
    } catch (error) {
      console.error('Error fetching ticket price distribution:', error);
      return { 
        labels: ['0-100', '101-200', '201-300', '301-400', '400+'], 
        data: [0, 0, 0, 0, 0] 
      };
    }
  },

  // Get monthly schedule trends (mock data for demonstration)
  async getMonthlyScheduleTrends() {
    try {
      const response = await axiosInstance.get('/schedules');
      const schedules = response.data.data || [];
      
      // Group schedules by month (using departure date)
      const monthlyData = {};
      const currentYear = new Date().getFullYear();
      
      // Initialize with current year months
      for (let i = 1; i <= 12; i++) {
        const monthName = new Date(currentYear, i - 1, 1).toLocaleString('default', { month: 'short' });
        monthlyData[monthName] = 0;
      }

      schedules.forEach(schedule => {
        if (schedule.departureDate) {
          const date = new Date(schedule.departureDate);
          const monthName = date.toLocaleString('default', { month: 'short' });
          if (monthlyData[monthName] !== undefined) {
            monthlyData[monthName]++;
          }
        }
      });

      return {
        labels: Object.keys(monthlyData),
        data: Object.values(monthlyData)
      };
    } catch (error) {
      console.error('Error fetching monthly schedule trends:', error);
      return { 
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
      };
    }
  }
};