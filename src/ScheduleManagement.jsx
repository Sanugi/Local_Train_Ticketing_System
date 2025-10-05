import { useEffect, useState } from "react";
import axiosInstance from "./service/axiosInstance";

function ScheduleManagement() {
  const [formData, setFormData] = useState({
    trainId: "",
    departureDate: "",
    departureTime: "",
    arrivalTime: "",
    availableSeats: "",
    date: "",
  });

  const [trainData, setTrainData] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState(null);

  // Fetch all trains
  const getAllTrains = async () => {
    try {
      const response = await axiosInstance.get("/trains");
      setTrainData(response.data.data);
    } catch (error) {
      console.error("Error fetching trains:", error);
    }
  };

  // Fetch all schedules
  const getAllSchedules = async () => {
    try {
      const response = await axiosInstance.get("/schedules");
      setSchedules(response.data.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    getAllTrains();
    getAllSchedules();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSchedule = async () => {
    try {
      const payload = {
        ...formData,
        availableSeats: Number(formData.availableSeats),
      };

      if (isEditMode) {
        // Update existing schedule
        await axiosInstance.patch(`/schedules/${editingScheduleId}`, payload);
        alert("Schedule updated successfully!");
      } else {
        // Add new schedule
        await axiosInstance.post("/schedules", payload);
        alert("Schedule added successfully!");
      }

      setFormData({
        trainId: "",
        departureDate: "",
        departureTime: "",
        arrivalTime: "",
        availableSeats: "",
        date: "",
      });

      setShowForm(false);
      setIsEditMode(false);
      setEditingScheduleId(null);
      getAllSchedules(); // refresh table
    } catch (error) {
      console.error(error);
      alert(isEditMode ? "Error updating schedule" : "Error adding schedule");
    }
  };

  const handleEditSchedule = (schedule) => {
    // Format dates for input fields
    const departureDate = new Date(schedule.departureDate)
      .toISOString()
      .split("T")[0];
    const date = new Date(schedule.date).toISOString().split("T")[0];

    setFormData({
      trainId: schedule.trainId._id,
      departureDate: departureDate,
      departureTime: schedule.departureTime,
      arrivalTime: schedule.arrivalTime,
      availableSeats: schedule.availableSeats.toString(),
      date: date,
    });
    setIsEditMode(true);
    setEditingScheduleId(schedule._id);
    setShowForm(true);
  };

  const handleDeleteSchedule = async (scheduleId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule?"
    );
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/schedules/${scheduleId}`);
        alert("Schedule deleted successfully!");
        getAllSchedules(); // refresh table
      } catch (error) {
        console.error(error);
        alert("Error deleting schedule");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {!showForm ? (
          <>
            <button onClick={() => setShowForm(true)} style={styles.addButton}>
              + Add Schedule
            </button>
            <h1 style={styles.heading}>Schedules</h1>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Train</th>
                  <th>Departure Date</th>
                  <th>Departure Time</th>
                  <th>Arrival Time</th>
                  <th>Available Seats</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule, index) => (
                  <tr key={index}>
                    <td>
                      {schedule.trainId?.trainNumber} -{" "}
                      {schedule.trainId?.trainName}
                    </td>
                    <td>
                      {new Date(schedule.departureDate).toLocaleDateString()}
                    </td>
                    <td>{schedule.departureTime}</td>
                    <td>{schedule.arrivalTime}</td>
                    <td>{schedule.availableSeats}</td>
                    <td>{new Date(schedule.date).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleEditSchedule(schedule)}
                        style={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSchedule(schedule._id)}
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
              {isEditMode ? "Edit Schedule" : "Add New Schedule"}
            </h1>

            <div style={styles.formGroup}>
              <label style={styles.label}>Train</label>
              <select
                name="trainId"
                value={formData.trainId}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select a train</option>
                {trainData.map((train) => (
                  <option key={train._id} value={train._id}>
                    {train.trainNumber} - {train.trainName}
                  </option>
                ))}
              </select>
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
                type="number"
                name="availableSeats"
                value={formData.availableSeats}
                onChange={handleChange}
                style={styles.input}
                min={1}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleAddSchedule} style={styles.addButton}>
                {isEditMode ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setIsEditMode(false);
                  setEditingScheduleId(null);
                  setFormData({
                    trainId: "",
                    departureDate: "",
                    departureTime: "",
                    arrivalTime: "",
                    availableSeats: "",
                    date: "",
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
    maxWidth: "900px",
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
    backgroundColor: "#4caf50",
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

export default ScheduleManagement;
