import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import background from "./assets/payment.avif";
import axiosInstance from "./service/axiosInstance";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, selectedSeats } = location.state || { selectedSeats: [], bookingData: null };

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card"); // or 'station'
  const [loading, setLoading] = useState(false);

  const effectiveBooking = bookingData || {
    seats: selectedSeats || [],
    seatsBooked: (selectedSeats && selectedSeats.length) || 0,
    totalAmount: 0,
    pricePerSeat: 0,
  };

  const handlePayment = async () => {
    // If card payment selected, validate fields
    if (paymentMethod === "card") {
      if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
        alert("Please fill in all card fields.");
        return;
      }
    }

    // Prepare payload to create booking on backend
    const payload = {
      trainId: bookingData?.trainId || bookingData?.train || null,
      scheduleId: bookingData?.scheduleId || null,
      seats: bookingData?.seats || selectedSeats,
      seatsBooked: bookingData?.seatsBooked || (selectedSeats && selectedSeats.length) || 0,
      totalAmount: bookingData?.totalAmount || 0,
      paymentMethod,
      paymentDetails: paymentMethod === "card" ? { cardNumber: cardNumber.slice(-4), cardHolder } : { note: "Pay at station" },
    };

    setLoading(true);
    try {
      await axiosInstance.post("/bookings", payload);
      setLoading(false);
      alert("Booking successful!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Booking failed. Please try again.");
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {/* Left side image */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Right side content */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PaymentIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Payment Details
            </Typography>

            {/* Payment Form */}
            <Box component="form" noValidate sx={{ mt: 2, width: "100%" }}>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                Select payment method:
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <Button
                  variant={paymentMethod === "card" ? "contained" : "outlined"}
                  onClick={() => setPaymentMethod("card")}
                >
                  Card
                </Button>
                <Button
                  variant={paymentMethod === "station" ? "contained" : "outlined"}
                  onClick={() => setPaymentMethod("station")}
                >
                  Pay at Station
                </Button>
              </Box>

              {paymentMethod === "card" && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Card Holder Name"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                  />
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      margin="normal"
                      required
                      label="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      margin="normal"
                      required
                      label="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      fullWidth
                    />
                  </Box>
                </>
              )}

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Booking Summary</Typography>
                <Typography>Seats: {effectiveBooking.seats?.join(", ") || "None"}</Typography>
                <Typography>Total: LKR {effectiveBooking.totalAmount}.00</Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "Processing..." : paymentMethod === "card" ? "Pay & Book" : "Confirm & Reserve"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Payment;


