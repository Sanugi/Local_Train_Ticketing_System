import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "./assets/train1.jpg";
import { sriLankanRailwayStations } from "./const/trainStationList";
import axiosInstance from "./service/axiosInstance";

function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setTrains([]);

    try {
      const response = await axiosInstance.get("trains/filter", {
        params: {
          fromStation: from,
          toStation: to,
          date: departure,
        },
      });

      setTrains(response.data.data);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleBookSeat = (train) => {
    navigate(`/SeatBooking/${train.trainNumber}`);
  };

  // Calculate schedule summary statistics
  const getScheduleSummary = () => {
    if (!trains.length) return null;

    const totalTrains = trains.length;
    const totalAvailableSeats = trains.reduce((sum, train) => sum + train.availableSeats, 0);
    const averagePrice = Math.round(trains.reduce((sum, train) => sum + train.ticketPrice, 0) / trains.length);
    const priceRange = {
      min: Math.min(...trains.map(train => train.ticketPrice)),
      max: Math.max(...trains.map(train => train.ticketPrice))
    };
    
    // Group trains by time periods
    const timeDistribution = trains.reduce((acc, train) => {
      const hour = parseInt(train.departureTime.split(':')[0]);
      let period;
      if (hour >= 5 && hour < 12) period = 'Morning';
      else if (hour >= 12 && hour < 17) period = 'Afternoon';
      else if (hour >= 17 && hour < 21) period = 'Evening';
      else period = 'Night';
      
      acc[period] = (acc[period] || 0) + 1;
      return acc;
    }, {});

    return {
      totalTrains,
      totalAvailableSeats,
      averagePrice,
      priceRange,
      timeDistribution
    };
  };

  const summary = getScheduleSummary();
  console.log(trains);
  return (
    <div
      style={{
        ...styles.pageWrapper,
        backgroundImage: `url(${image})`,
      }}
    >
      <h1 style={styles.pageHeading}> Your Adventure Begins Here </h1>
      <div style={styles.container}>
        <h2 style={styles.header}>🚆 Where are you going?</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label>From Station</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              style={styles.input}
            >
              <option value="">Select a station</option>
              {sriLankanRailwayStations.map((station, index) => (
                <option key={index} value={station.name}>
                  {station.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label>To Station</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">Select a station</option>
              {sriLankanRailwayStations.map((station, index) => (
                <option key={index} value={station.name}>
                  {station.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label>Departure Date</label>
            <input
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Search Train
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        {summary && (
          <div style={styles.summarySection}>
            <h3 style={styles.summaryTitle}>📊 Schedule Summary</h3>
            <div style={styles.summaryGrid}>
              <div style={styles.summaryCard}>
                <div style={styles.summaryNumber}>{summary.totalTrains}</div>
                <div style={styles.summaryLabel}>Available Trains</div>
              </div>
              <div style={styles.summaryCard}>
                <div style={styles.summaryNumber}>{summary.totalAvailableSeats}</div>
                <div style={styles.summaryLabel}>Total Seats</div>
              </div>
              <div style={styles.summaryCard}>
                <div style={styles.summaryNumber}>Rs. {summary.averagePrice}</div>
                <div style={styles.summaryLabel}>Avg Price</div>
              </div>
              <div style={styles.summaryCard}>
                <div style={styles.summaryNumber}>Rs. {summary.priceRange.min} - {summary.priceRange.max}</div>
                <div style={styles.summaryLabel}>Price Range</div>
              </div>
            </div>
            
            <div style={styles.timeDistribution}>
              <h4 style={styles.timeTitle}>🕒 Departure Times</h4>
              <div style={styles.timeGrid}>
                {Object.entries(summary.timeDistribution).map(([period, count]) => (
                  <div key={period} style={styles.timeSlot}>
                    <span style={styles.timePeriod}>{period}</span>
                    <span style={styles.timeCount}>{count} trains</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!trains.length && !error && (
          <p style={{ marginTop: "10px" }}>
            No trains found. Please adjust your search criteria.
          </p>
        )}
        {trains.length > 0 && (
          <div style={styles.ticketSection}>
            <h3 style={styles.sectionTitle}>🚂 Available Trains ({trains.length})</h3>
            <div style={styles.trainGrid}>
              {trains.map((train, index) => (
                <div key={index} style={styles.ticketCard}>
                  <div style={styles.trainHeader}>
                    <div style={styles.trainInfo}>
                      <h4 style={styles.trainName}>{train.trainName}</h4>
                      <span style={styles.trainNumber}>#{train.trainNumber}</span>
                    </div>
                    <div style={styles.priceTag}>
                      Rs. {train.ticketPrice}
                    </div>
                  </div>
                  
                  <div style={styles.routeInfo}>
                    <div style={styles.stationInfo}>
                      <span style={styles.stationLabel}>From:</span>
                      <span style={styles.stationName}>{train.fromStation}</span>
                    </div>
                    <div style={styles.routeArrow}>→</div>
                    <div style={styles.stationInfo}>
                      <span style={styles.stationLabel}>To:</span>
                      <span style={styles.stationName}>{train.toStation}</span>
                    </div>
                  </div>

                  <div style={styles.scheduleInfo}>
                    <div style={styles.scheduleItem}>
                      <span style={styles.scheduleLabel}>📅 Date:</span>
                      <span>{new Date(train.departureDate).toLocaleDateString()}</span>
                    </div>
                    <div style={styles.scheduleItem}>
                      <span style={styles.scheduleLabel}>🕐 Time:</span>
                      <span>{train.departureTime}</span>
                    </div>
                    <div style={styles.scheduleItem}>
                      <span style={styles.scheduleLabel}>💺 Available:</span>
                      <span style={train.availableSeats < 10 ? styles.lowSeats : styles.normalSeats}>
                        {train.availableSeats} seats
                      </span>
                    </div>
                  </div>

                  <button
                    style={train.availableSeats > 0 ? styles.bookButton : styles.disabledButton}
                    onClick={() => handleBookSeat(train)}
                    disabled={train.availableSeats === 0}
                  >
                    {train.availableSeats > 0 ? 'Book Now' : 'Fully Booked'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link to="/" style={styles.logout}>
          Logout
        </Link>
      </div>
    </div>
  );
}

const styles = {
  pageHeading: {
    position: "absolute",
    top: "5%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "48px",
    fontWeight: "bold",
    color: "white",
    textShadow: "3px 3px 8px rgba(0,0,0,0.7)",
    textAlign: "center",
    zIndex: 10,
  },

  pageWrapper: {
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "20px",
    paddingTop: "120px",
  },
  container: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    padding: "30px",
    fontFamily: "sans-serif",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    alignItems: "end",
    marginBottom: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    minHeight: "20px",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#3f51b5",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.2s",
    gridColumn: "1 / -1",
  },
  summarySection: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
    border: "2px solid #e3f2fd",
  },
  summaryTitle: {
    margin: "0 0 15px 0",
    color: "#1976d2",
    textAlign: "center",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },
  summaryCard: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid #dee2e6",
  },
  summaryNumber: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: "5px",
  },
  summaryLabel: {
    fontSize: "12px",
    color: "#666",
    textTransform: "uppercase",
  },
  timeDistribution: {
    borderTop: "1px solid #dee2e6",
    paddingTop: "15px",
  },
  timeTitle: {
    margin: "0 0 10px 0",
    color: "#333",
    fontSize: "16px",
  },
  timeGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  timeSlot: {
    backgroundColor: "#e8f5e8",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #c8e6c9",
  },
  timePeriod: {
    fontWeight: "bold",
    color: "#2e7d32",
  },
  timeCount: {
    fontSize: "12px",
    color: "#666",
  },
  ticketSection: {
    marginTop: "40px",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "10px",
    border: "1px dashed #ccc",
  },
  trainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
  },
  sectionTitle: {
    margin: "0 0 20px 0",
    color: "#1976d2",
    borderBottom: "2px solid #e3f2fd",
    paddingBottom: "10px",
  },
  ticketCard: {
    marginTop: "15px",
    padding: "20px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  trainHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "10px",
  },
  trainInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  trainName: {
    margin: "0",
    color: "#1976d2",
    fontSize: "18px",
  },
  trainNumber: {
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  priceTag: {
    backgroundColor: "#2e7d32",
    color: "white",
    padding: "8px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  routeInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  stationInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stationLabel: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "4px",
  },
  stationName: {
    fontWeight: "bold",
    color: "#333",
    fontSize: "14px",
  },
  routeArrow: {
    fontSize: "20px",
    color: "#1976d2",
    fontWeight: "bold",
  },
  scheduleInfo: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    marginBottom: "15px",
  },
  scheduleItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  scheduleLabel: {
    fontSize: "12px",
    color: "#666",
    fontWeight: "bold",
  },
  lowSeats: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
  normalSeats: {
    color: "#2e7d32",
    fontWeight: "bold",
  },
  bookButton: {
    padding: "12px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "14px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
    transition: "background-color 0.2s",
  },
  disabledButton: {
    padding: "12px 20px",
    backgroundColor: "#ccc",
    color: "#666",
    fontSize: "14px",
    border: "none",
    borderRadius: "25px",
    cursor: "not-allowed",
    fontWeight: "bold",
    width: "100%",
  },
  logout: {
    display: "block",
    marginTop: "30px",
    textAlign: "center",
    textDecoration: "none",
    color: "#3f51b5",
  },
};

export default Home;
