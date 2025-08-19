import React, { useState } from "react";
import axios from "axios";
import image from "./assets/train.jpg";

function AddTrain() {
  const [formData, setFormData] = useState({
    trainNumber: "",
    trainName: "",
    fromStation: "",
    ToStation: "",
    departureDate: "",
    departureTime: "",
    arrivalTime: "",
    availableSeats: "",
    ticketPrice: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTrain = async () => {
    try {
      // Replace with your backend endpoint
      const res = await axios.post("http://localhost:7000/api/users/addTrain", formData);
      alert("Train added successfully!");
      setFormData({
       trainNumber: "",
       trainName: "",
       fromStation: "",
       ToStation: "",
       departureDate: "",
       departureTime: "",
       arrivalTime: "",
       availableSeats: "",
       ticketPrice: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error adding train");
    }
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${image})` }}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Add New Train</h1>

        <div style={styles.formGroup}>
          <label style={styles.label}>Train Number</label>
          <input
            type="text"
            name="trainNumber"
            value={formData.trainNumber}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Train Name</label>
          <input
            type="text"
            name="trainName"
            value={formData.trainName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>from Station</label>
          <input
            type="text"
            name="fromStation"
            value={formData.fromStation}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

          <div style={styles.formGroup}>
          <label style={styles.label}>To Station</label>
          <input
            type="text"
            name="ToStation"
            value={formData.ToStation}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Departure Date</label>
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Departure Time</label>
          <input
            type="time"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

          <div style={styles.formGroup}>
          <label style={styles.label}>Arrival Time</label>
          <input
            type="time"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

          <div style={styles.formGroup}>
          <label style={styles.label}>Available Seats</label>
          <input
            type="text"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

          <div style={styles.formGroup}>
          <label style={styles.label}>Ticket Price</label>
          <input
            type="number"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button onClick={handleAddTrain} style={styles.addButton}>
          Add Train
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
    fontFamily: "'Roboto', sans-serif",
    opacity: 0.9,
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#333",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },
  addButton: {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    width: "100%",
    maxWidth: "200px",
    marginTop: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

export default AddTrain;
