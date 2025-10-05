import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import image from "./assets/train.jpg";

function SeatBooking() {
  const { scheduleId } = useParams(); // using scheduleId instead of trainNumber
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const seatPrice = 25;

  // ✅ Replace with your auth logic
  const userId = localStorage.getItem("userId"); // or from context

  // 🔹 Fetch seats from backend schedule
  useEffect(() => {
    axios
      .get(`/train//${scheduleId}`)
      .then((res) => {
        setSeats(res.data.seats); // must be array [{id, status}]
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching seats:", err);
        setLoading(false);
      });
  }, [scheduleId]);

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const handleBookNow = async () => {
    if (!userId) {
      alert("Please log in to continue");
      return;
    }

    const bookingData = {
      userId,
      scheduleId,
      seatsBooked: selectedSeats.length,
      totalAmount: selectedSeats.length * seatPrice,
    };

    try {
      await axios.post("http://localhost:7000/api/bookings", bookingData);
      navigate("/book-tickets", { state: { bookingData, selectedSeats } });
    } catch (err) {
      console.error(err);
      alert("Booking failed. Try again.");
    }
  };

  if (loading) {
    return <p style={{ color: "#fff", textAlign: "center" }}>Loading seats...</p>;
  }

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${image})` }}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>🚆 Select Your Seat</h1>
        <div style={styles.train}>
          {seats.map((seat) => {
            const isSelected = selectedSeats.includes(seat.id);
            const isBooked = seat.status === "booked";
            const isHovered = hoveredSeat === seat.id;

            return (
              <button
                key={seat.id}
                onClick={() => !isBooked && toggleSeat(seat.id)}
                onMouseEnter={() => setHoveredSeat(seat.id)}
                onMouseLeave={() => setHoveredSeat(null)}
                disabled={isBooked}
                style={{
                  ...styles.seat,
                  backgroundColor: isBooked
                    ? "#ff4d4d"
                    : isSelected
                    ? "#00d2d3"
                    : isHovered
                    ? "#74b9ff"
                    : "#e0e0e0",
                  color: isBooked || isSelected ? "#fff" : "#000",
                  cursor: isBooked ? "not-allowed" : "pointer",
                }}
              >
                {seat.id}
              </button>
            );
          })}
        </div>

        {/* Booking Summary */}
        <div style={styles.bookingSummary}>
          <h3 style={{ color: "#fff" }}>Booking Summary</h3>
          <p style={{ color: "#fff" }}>
            Seats: {selectedSeats.join(", ") || "None"}
          </p>
          <p style={{ color: "#fff" }}>Total: LKR {selectedSeats.length * seatPrice}.00</p>
          {selectedSeats.length > 0 && (
            <button onClick={handleBookNow} style={styles.bookNowButton}>
              Continue to Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px", backgroundSize: "cover", minHeight: "100vh" },
  overlay: { backgroundColor: "rgba(0,0,0,0.7)", padding: "30px", borderRadius: "12px" },
  heading: { color: "#fff", marginBottom: "20px" },
  train: { display: "grid", gridTemplateColumns: "repeat(4, 70px)", gap: "15px" },
  seat: { width: "70px", height: "70px", borderRadius: "10px", border: "2px solid #ccc" },
  bookingSummary: { marginTop: "20px", padding: "15px", background: "#333", borderRadius: "10px" },
  bookNowButton: {
    marginTop: "10px",
    padding: "10px 20px",
    background: "#00d2d3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SeatBooking;
