import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./service/axiosInstance";

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [formData, setFormData] = useState({
    passengerName: "",
    contact: "",
    seatsBooked: "",
    totalAmount: "",
    status: "pending",
  });

  const getAllBookings = async () => {
    try {
      const res = await axiosInstance.get("/bookings/bookings");
      setBookings(res.data.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  // read user role from localStorage (set during login)
  const storedRole = (() => {
    try {
      return JSON.parse(localStorage.getItem("role")) || "User";
    } catch (e) {
      return localStorage.getItem("role") || "User";
    }
  })();
  const isAdmin = storedRole === "Admin";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditBooking = (booking) => {
    setFormData({
      passengerName: booking.userId?.username || booking.passengerName || "",
      contact: booking.userId?.email || booking.contact || "",
      seatsBooked: booking.seatsBooked ? booking.seatsBooked.toString() : "",
      totalAmount: booking.totalAmount ? booking.totalAmount.toString() : "",
      status: booking.status || "pending",
    });
    setIsEditMode(true);
    setEditingBookingId(booking._id);
    setShowForm(true);
  };

  const handleSaveBooking = async () => {
    try {
      const payload = {
        seatsBooked: Number(formData.seatsBooked),
        totalAmount: Number(formData.totalAmount) || 0,
        status: formData.status,
      };

      if (isEditMode) {
        await axiosInstance.patch(`/bookings/bookings/${editingBookingId}`, payload);
        alert("Booking updated successfully!");
      } else {
        await axiosInstance.post(`/bookings`, payload);
        alert("Booking created successfully!");
      }

      setShowForm(false);
      setIsEditMode(false);
      setEditingBookingId(null);
      setFormData({
        passengerName: "",
        contact: "",
        seatsBooked: "",
        totalAmount: "",
        status: "pending",
      });
      getAllBookings();
    } catch (error) {
      console.error(error);
      alert(isEditMode ? "Error updating booking" : "Error creating booking");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/bookings/bookings/${bookingId}`);
      alert("Booking deleted successfully!");
      getAllBookings();
    } catch (error) {
      console.error(error);
      alert("Error deleting booking");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {!showForm ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h1 style={styles.heading}>Bookings</h1>
              <Link to="/home" style={styles.backButton}>
                Back
              </Link>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Booking #</th>
                  <th>Passenger</th>
                  <th>Contact</th>
                  <th>Train / Schedule</th>
                  <th>Seats</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={i}>
                    <td>{b._id}</td>
                    <td>{b.userId?.username || "-"}</td>
                    <td>{b.userId?.email || "-"}</td>
                    <td>
                      {b.scheduleId ? (
                        <>
                          {b.train?.trainNumber} - {b.train?.trainName}
                          <div style={{ fontSize: 12, color: "#666" }}>
                            {b.scheduleId.date
                              ? new Date(b.scheduleId.date).toLocaleDateString()
                              : ""}{" "}
                            {b.scheduleId.departureTime}
                          </div>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{b.seatsBooked}</td>
                    <td>{b.totalAmount ?? "-"}</td>
                    <td>{b.status}</td>
                    <td>
                      {isAdmin ? (
                        <>
                          <button
                            onClick={() => handleEditBooking(b)}
                            style={styles.editButton}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBooking(b._id)}
                            style={styles.deleteButton}
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <span style={{ color: "#666", fontSize: 12 }}>
                          No actions
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h1 style={styles.heading}>
              {isEditMode ? "Edit Booking" : "Add Booking"}
            </h1>

            <div style={styles.formGroup}>
              <label style={styles.label}>Passenger Name</label>
              <input
                name="passengerName"
                value={formData.passengerName}
                onChange={handleChange}
                style={styles.input}
                readOnly={isEditMode}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Contact</label>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                style={styles.input}
                readOnly={isEditMode}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Seats Booked</label>
              <input
                name="seatsBooked"
                type="number"
                min={1}
                value={formData.seatsBooked}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Total Amount</label>
              <input
                name="totalAmount"
                type="number"
                min={0}
                step="0.01"
                value={formData.totalAmount}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleSaveBooking} style={styles.addButton}>
                {isEditMode ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setIsEditMode(false);
                  setEditingBookingId(null);
                  setFormData({
                    passengerName: "",
                    contact: "",
                    seats: "",
                    status: "pending",
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
    maxWidth: "1000px",
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
  formGroup: { marginBottom: "15px" },
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
  },
  deleteButton: {
    padding: "8px 16px",
    fontSize: "12px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  backButton: {
    padding: "8px 14px",
    fontSize: "14px",
    backgroundColor: "#eee",
    color: "#333",
    textDecoration: "none",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
};

export default BookingManagement;
