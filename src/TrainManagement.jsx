import { useState, useEffect } from "react";
import { sriLankanRailwayStations } from "./const/trainStationList";
import axiosInstance from "./service/axiosInstance";

function TrainManagement() {
  const [formData, setFormData] = useState({
    trainNumber: "",
    trainName: "",
    fromStation: "",
    toStation: "",
    seatCount: "",
    ticketPrice: "",
  });
  const [trains, setTrains] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTrainId, setEditingTrainId] = useState(null);

  // Fetch trains from API
  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const res = await axiosInstance.get("/trains");
      setTrains(res.data.data);
    } catch (error) {
      console.error("Error fetching trains:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTrain = async () => {
    try {
      const payload = {
        ...formData,
        seatCount: Number(formData.seatCount),
        ticketPrice: Number(formData.ticketPrice),
      };

      if (isEditMode) {
        // Update existing train
        await axiosInstance.patch(`/trains/${editingTrainId}`, payload);
        alert("Train updated successfully!");
      } else {
        // Add new train
        await axiosInstance.post("/trains", payload);
        alert("Train added successfully!");
      }

      setFormData({
        trainNumber: "",
        trainName: "",
        fromStation: "",
        toStation: "",
        seatCount: "",
        ticketPrice: "",
      });

      setShowForm(false);
      setIsEditMode(false);
      setEditingTrainId(null);
      fetchTrains(); // refresh table
    } catch (error) {
      console.error(error);
      alert(isEditMode ? "Error updating train" : "Error adding train");
    }
  };

  const handleEditTrain = (train) => {
    setFormData({
      trainNumber: train.trainNumber,
      trainName: train.trainName,
      fromStation: train.fromStation,
      toStation: train.toStation,
      seatCount: train.seatCount.toString(),
      ticketPrice: train.ticketPrice.toString(),
    });
    setIsEditMode(true);
    setEditingTrainId(train._id);
    setShowForm(true);
  };

  const handleDeleteTrain = async (trainId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this train?"
    );
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/trains/${trainId}`);
        alert("Train deleted successfully!");
        fetchTrains(); // refresh table
      } catch (error) {
        console.error(error);
        alert("Error deleting train");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {!showForm ? (
          <>
            <button onClick={() => setShowForm(true)} style={styles.addButton}>
              + Add Train
            </button>
            <h1 style={styles.heading}>Train List</h1>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Train Number</th>
                  <th>Train Name</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Seats</th>
                  <th>Price (Rs.)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trains.map((train, index) => (
                  <tr key={index}>
                    <td>{train.trainNumber}</td>
                    <td>{train.trainName}</td>
                    <td>{train.fromStation}</td>
                    <td>{train.toStation}</td>
                    <td>{train.seatCount}</td>
                    <td>{train.ticketPrice}</td>
                    <td>
                      <button
                        onClick={() => handleEditTrain(train)}
                        style={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTrain(train._id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h1 style={styles.heading}>
              {isEditMode ? "Edit Train" : "Add New Train"}
            </h1>

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
              <label style={styles.label}>From Station</label>
              <select
                name="fromStation"
                value={formData.fromStation}
                onChange={handleChange}
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

            <div style={styles.formGroup}>
              <label style={styles.label}>To Station</label>
              <select
                name="toStation"
                value={formData.toStation}
                onChange={handleChange}
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

            <div style={styles.formGroup}>
              <label style={styles.label}>Seat Count</label>
              <input
                type="number"
                name="seatCount"
                value={formData.seatCount}
                onChange={handleChange}
                style={styles.input}
                min={1}
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
                min={0}
                step={0.01}
                placeholder="Enter price in Rs."
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleAddTrain} style={styles.addButton}>
                {isEditMode ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setIsEditMode(false);
                  setEditingTrainId(null);
                  setFormData({
                    trainNumber: "",
                    trainName: "",
                    fromStation: "",
                    toStation: "",
                    seatCount: "",
                    ticketPrice: "",
                  });
                }}
                style={{ ...styles.addButton, backgroundColor: "gray" }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    fontFamily: "'Roboto', sans-serif",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  addButton: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    marginTop: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },
  editButton: {
    padding: "8px 16px",
    fontSize: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
    transition: "background-color 0.3s",
  },
  deleteButton: {
    padding: "8px 16px",
    fontSize: "12px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default TrainManagement;
