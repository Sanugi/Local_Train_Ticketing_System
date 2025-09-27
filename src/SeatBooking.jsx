// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import image from './assets/train.jpg';

// function SeatBooking() {
//   const { trainNumber } = useParams(); 
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [seats, setSeats] = useState([]); // now stores all seats with status
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch seats from backend
//   useEffect(() => {
//     axios
//       .get(`http://localhost:7000/api/users/${trainNumber}/seats`)
//       .then((res) => {
//         setSeats(res.data.seats); // seats = [{id:"A1", status:"booked"}, {id:"A2", status:"available"}, ...]
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching seat data:", err);
//         setLoading(false);
//       });
//   }, [trainNumber]);

//   const toggleSeat = (seatId) => {
//     setSelectedSeats((prev) =>
//       prev.includes(seatId)
//         ? prev.filter((s) => s !== seatId)
//         : [...prev, seatId]
//     );
//   };

//   const handleBookNow = () => {
//     axios
//       .post(`http://localhost:7000/api/users/seatBooking`, {
//         trainNumber,
//         seatsToBook: selectedSeats
//       })
//       .then(() => {
//         navigate("/book-tickets", { state: { selectedSeats, trainNumber } });
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Error booking seats");
//       });
//   };

//   if (loading) {
//     return <p style={{ color: "#fff", textAlign: "center" }}>Loading seats...</p>;
//   }

//   return (
//     <div style={{ ...styles.container, backgroundImage: `url(${image})` }}>
//       <h1 style={styles.heading}>🚆 Select Your Seat for Train {trainNumber}</h1>

//       <div style={styles.train}>
//         <div style={styles.seatGrid}>
//           {seats.map((seat) => {
//             const isSelected = selectedSeats.includes(seat.id);
//             const isBooked = seat.status === "booked";

//             return (
//               <button
//                 key={seat.id}
//                 onClick={() => !isBooked && toggleSeat(seat.id)}
//                 disabled={isBooked}
//                 style={{
//                   ...styles.seat,
//                   backgroundColor: isBooked
//                     ? "#ff4d4d"
//                     : isSelected
//                     ? "#4caf50"
//                     : "#e0e0e0",
//                   color: isBooked || isSelected ? "#fff" : "#000",
//                   cursor: isBooked ? "not-allowed" : "pointer"
//                 }}
//               >
//                 {seat.id}
//               </button>
//             );
//           })}
//         </div>

//         {/* Legends */}
//         <div style={styles.legends}>
//           <div style={styles.legendItem}>
//             <div style={{ ...styles.legendColor, backgroundColor: "#e0e0e0" }} />
//             <span>Available</span>
//           </div>
//           <div style={styles.legendItem}>
//             <div style={{ ...styles.legendColor, backgroundColor: "#4caf50" }} />
//             <span>Selected</span>
//           </div>
//           <div style={styles.legendItem}>
//             <div style={{ ...styles.legendColor, backgroundColor: "#ff4d4d" }} />
//             <span>Booked</span>
//           </div>
//         </div>

//         {/* Selected seats info */}
//         <div style={styles.selection}>
//           <h4>Selected Seats:</h4>
//           <p>{selectedSeats.join(", ") || "None"}</p>
//         </div>

//         {selectedSeats.length > 0 && (
//           <button onClick={handleBookNow} style={styles.bookNowButton}>
//             Continue
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "40px",
//     fontFamily: "Arial, sans-serif",
//     textAlign: "center",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     minHeight: "100vh",
//   },
//   heading: {
//     marginBottom: "20px",
//     color: "#fff",
//   },
//   train: {
//     display: "inline-block",
//     padding: "20px",
//     borderRadius: "12px",
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//   },
//   seatGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 70px)",
//     gap: "15px",
//     justifyContent: "center",
//     marginBottom: "30px",
//   },
//   seat: {
//     width: "70px",
//     height: "70px",
//     fontSize: "18px",
//     borderRadius: "10px",
//     border: "2px solid #ccc",
//     transition: "0.2s ease",
//   },
//   legends: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "30px",
//     marginBottom: "20px",
//   },
//   legendItem: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     fontSize: "16px",
//   },
//   legendColor: {
//     width: "25px",
//     height: "25px",
//     borderRadius: "5px",
//     border: "1px solid #999",
//   },
//   selection: {
//     fontSize: "16px",
//     marginTop: "10px",
//     color: "#fff",
//   },
//   bookNowButton: {
//     marginTop: "20px",
//     padding: "10px 20px",
//     fontSize: "16px",
//     backgroundColor: "#4caf50",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default SeatBooking;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image from './assets/train.jpg';

function SeatBooking() {
  const { trainNumber } = useParams(); 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  // 🔹 Hardcoded seat layout
  const seats = [
    { id: "A1", status: "available" },
    { id: "A2", status: "booked" },
    { id: "A3", status: "available" },
    { id: "A4", status: "available" },
    { id: "B1", status: "booked" },
    { id: "B2", status: "available" },
    { id: "B3", status: "available" },
    { id: "B4", status: "available" },
    { id: "C1", status: "available" },
    { id: "C2", status: "booked" },
    { id: "C3", status: "available" },
    { id: "C4", status: "available" },
  ];

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBookNow = () => {
    navigate("/book-tickets", { state: { selectedSeats, trainNumber } });
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${image})` }}>
      <h1 style={styles.heading}>🚆 Select Your Seat for Train {trainNumber}</h1>

      <div style={styles.train}>
        <div style={styles.seatGrid}>
          {seats.map((seat) => {
            const isSelected = selectedSeats.includes(seat.id);
            const isBooked = seat.status === "booked";

            return (
              <button
                key={seat.id}
                onClick={() => !isBooked && toggleSeat(seat.id)}
                disabled={isBooked}
                style={{
                  ...styles.seat,
                  backgroundColor: isBooked
                    ? "#ff4d4d"   
                    : isSelected
                    ? "#4caf50"   
                    : "#e0e0e0",  
                  color: isBooked || isSelected ? "#fff" : "#000",
                  cursor: isBooked ? "not-allowed" : "pointer"
                }}
              >
                {seat.id}
              </button>
            );
          })}
        </div>

        {/* Legends */}
        <div style={styles.legends}>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, backgroundColor: "#e0e0e0" }} />
            <span>Available</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, backgroundColor: "#4caf50" }} />
            <span>Selected</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, backgroundColor: "#ff4d4d" }} />
            <span>Booked</span>
          </div>
        </div>

        {/* Selected seats info */}
        <div style={styles.selection}>
          <h4>Selected Seats:</h4>
          <p>{selectedSeats.join(", ") || "None"}</p>
        </div>

        {selectedSeats.length > 0 && (
          <button onClick={handleBookNow} style={styles.bookNowButton}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "20px",
    color: "#fff",
  },
  train: {
    display: "inline-block",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  seatGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 70px)",
    gap: "15px",
    justifyContent: "center",
    marginBottom: "30px",
  },
  seat: {
    width: "70px",
    height: "70px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "2px solid #ccc",
    transition: "0.2s ease",
  },
  legends: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "20px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
  },
  legendColor: {
    width: "25px",
    height: "25px",
    borderRadius: "5px",
    border: "1px solid #999",
  },
  selection: {
    fontSize: "16px",
    marginTop: "10px",
    color: "#fff",
  },
  bookNowButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SeatBooking;

