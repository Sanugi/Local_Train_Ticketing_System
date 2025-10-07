import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image from "./assets/train.jpg";
import axiosInstance from "./service/axiosInstance";

function SeatBooking() {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [dynamicPrice, setDynamicPrice] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const [train, setTrain] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/schedules/train/${id}`)
      .then((res) => {
        const payload = res.data.data || res.data; 
        const schedule = Array.isArray(payload) ? payload[0] : payload;
        if (!schedule) {
          setSeats([]);
          setLoading(false);
          return;
        }
        setTrain(schedule.trainId);
        if (schedule.trainId && schedule.trainId.ticketPrice) {
          setDynamicPrice(Number(schedule.trainId.ticketPrice));
        }
        if(schedule._id){
          setScheduleId(schedule._id);
        }

        const totalSeats = (schedule.trainId && schedule.trainId.seatCount) || 0;
        const available = typeof schedule.availableSeats === "number" ? schedule.availableSeats : schedule.availableSeats ? Number(schedule.availableSeats) : 0;

        const seatsArr = Array.from({ length: totalSeats }, (_, i) => {
          const seatNumber = i + 1;
          const isAvailable = seatNumber <= available;
          return { id: seatNumber, status: isAvailable ? "available" : "booked" };
        });

        setSeats(seatsArr);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching seats:", err);
        setLoading(false);
      });
  }, [id]);

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const handleBookNow = async () => {
    const pricePerSeat = dynamicPrice || 0;
    const bookingData = {
      trainId: id,
      scheduleId: scheduleId,
      seats: selectedSeats,
      seatsBooked: selectedSeats.length,
      totalAmount: selectedSeats.length * pricePerSeat,
      pricePerSeat: pricePerSeat,
    };
    try {
      // forward booking data to the confirmation page which will route to payment
      navigate("/book-tickets", { state: { bookingData, selectedSeats, train } });
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
          <p style={{ color: "#fff" }}>Total: LKR {selectedSeats.length * dynamicPrice}.00</p>
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
  train: { display: "grid", gridTemplateColumns: "repeat(10, 70px)", gap: "15px" },
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
