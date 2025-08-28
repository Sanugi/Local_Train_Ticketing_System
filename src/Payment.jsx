import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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

function Payment() {
  const location = useLocation();
  const { selectedSeats, trainDetails } = location.state || { selectedSeats: [] };

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      alert("Please fill in all fields.");
      return;
    }
    alert("Payment Successful! Tickets Booked.");
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
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handlePayment}
              >
                Pay & Book
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Payment;


