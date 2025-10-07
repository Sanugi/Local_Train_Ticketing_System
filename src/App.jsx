import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Forgetpassword from "./Forgetpassword";
import SeatBooking from "./SeatBooking";
import BookTickets from "./BookTickets";
import Payment from "./Payment";
import ContactPage from "./ContactPage";
import TrainManagement from "./TrainManagement";
import AddSchedule from "./ScheduleManagement";
import BookingManagement from "./BookingManagement";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashBoard";
import Varify from "./Varify";
import ResetPassword from "./ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Forgetpassword" element={<Forgetpassword />} />
        <Route path="/SeatBooking/:id" element={<SeatBooking />} />
        <Route path="/book-tickets" element={<BookTickets />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/addTrain" element={<TrainManagement />} />
        <Route path="/addSchedule" element={<AddSchedule />} />
        <Route path="/bookingManagement" element={<BookingManagement />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/Varify" element={<Varify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
