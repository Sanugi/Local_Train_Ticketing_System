import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import image from './assets/train.jpg';

function Payment() {
  const location = useLocation();
  const { selectedSeats, trainDetails } = location.state || { selectedSeats: [] };

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Payment Successful! Tickets Booked.");
  
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${image})` }}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Enter Your Payment Details</h1>

        <div style={styles.trainDetails}>
          <h3 style={styles.subHeading}>Train Details</h3>
          <p><strong>Train Number:</strong> {trainDetails?.trainNumber}</p>
          <p><strong>Train Name:</strong> {trainDetails?.trainName}</p>
          <p><strong>Platform:</strong> {trainDetails?.platform}</p>
          <p><strong>Departure Time:</strong> {trainDetails?.departureTime}</p>
        </div>

        <div style={styles.ticketInfo}>
          <h3 style={styles.subHeading}>Selected Seats</h3>
          <p>{selectedSeats.join(", ") || "None"}</p>
        </div>

        <div style={styles.paymentForm}>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            style={styles.input}
          />
        </div>

        <button onClick={handlePayment} style={styles.bookNowButton}>
          Pay & Book
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
    backgroundSize: "cover", 
    backgroundPosition: "center", 
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
    opacity: 0.9, 
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
  ticketInfo: {
    marginBottom: "30px",
  },
  paymentForm: {
    marginBottom: "30px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
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

export default Payment;
