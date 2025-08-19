import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import image from './assets/train.jpg';

function BookTickets() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats } = location.state || { selectedSeats: [] };

  // Hardcoded train details for now
  const trainDetails = {
    trainNumber: "123A",
    trainName: "Express 101",
    platform: "5",
    departureTime: "2025-04-10 10:30 AM",
  };

  const handleBookTrain = () => {
    navigate("/payment", { state: { selectedSeats, trainDetails } });
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${image})` }}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Book Your Tickets</h1>

        {/* Train Details */}
        <div style={styles.trainDetails}>
          <h3 style={styles.subHeading}>Train Details</h3>
          <p style={styles.detailItem}>
            <strong>Train Number:</strong> {trainDetails.trainNumber}
          </p>
          <p style={styles.detailItem}>
            <strong>Train Name:</strong> {trainDetails.trainName}
          </p>
          <p style={styles.detailItem}>
            <strong>Platform:</strong> {trainDetails.platform}
          </p>
          <p style={styles.detailItem}>
            <strong>Departure Time:</strong> {trainDetails.departureTime}
          </p>
        </div>

        {/* Selected Seats */}
        <div style={styles.ticketInfo}>
          <h3 style={styles.subHeading}>Selected Seats</h3>
          <p style={styles.selectedSeats}>
            {selectedSeats.join(", ") || "None"}
          </p>
        </div>

        {/* Book the Train Button */}
        <button onClick={handleBookTrain} style={styles.bookNowButton}>
          Book the Train
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundSize: "cover", // Ensures the image covers the screen
    backgroundPosition: "center", // Keeps the image centered
    backgroundRepeat: "no-repeat",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
    opacity: 0.9, // Adding opacity to the card to make text more readable
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#333",
  },
  subHeading: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "15px",
    textAlign: "left",
    color: "#333",
  },
  trainDetails: {
    textAlign: "left",
    marginBottom: "30px",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "20px",
  },
  detailItem: {
    fontSize: "18px",
    lineHeight: "2",
    color: "#555",
  },
  ticketInfo: {
    marginBottom: "30px",
  },
  selectedSeats: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#333",
    padding: "10px",
    backgroundColor: "#e0f7fa",
    borderRadius: "5px",
    wordBreak: "break-word",
  },
  bookNowButton: {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    width: "100%",
    maxWidth: "200px",
    marginTop: "30px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default BookTickets;
