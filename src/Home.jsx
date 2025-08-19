import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.get("http://localhost:7000/api/users/getTrain", {
        params: {
          fromStation: from,
          ToStation: to,
          departureDate: departure
        }
      });

      setTrains(response.data); // store the search results
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


  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🚆 Where are you going?</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>From Station</label>
          <input
            type="text"
            placeholder="Enter departure station"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label>To Station</label>
          <input
            type="text"
            placeholder="Enter destination station"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={styles.input}
            required
          />
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

        <button type="submit" style={styles.button}>Search Train</button>
      </form>

      {/* Error Message */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {/* Search Results */}
      {trains.length > 0 && (
        <div style={styles.ticketSection}>
          <h3>Available Trains</h3>
          {trains.map((train, index) => (
            <div key={index} style={styles.ticketCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p><strong>{train.trainName}</strong> ({train.trainNumber})</p>
                  <p>From: {train.fromStation} → To: {train.ToStation}</p>
                  <p>Departure: {train.departureDate} {train.departureTime}</p>
                  <p>Ticket Price: Rs. {train.ticketPrice}</p>
                  <p>Available Seats: {train.availableSeats}</p>
                </div>
                <button
                  style={styles.bookButton}
                  onClick={() => handleBookSeat(train)}
                >
                  Book Seat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/" style={styles.logout}>Logout</Link>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    fontFamily: "sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#3f51b5",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  ticketSection: {
    marginTop: "40px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px dashed #ccc",
  },
  ticketCard: {
    marginTop: "10px",
    padding: "15px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
  },
  bookButton: {
    padding: "8px 14px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    height: "fit-content"
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
