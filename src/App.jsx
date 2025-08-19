import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup'; 
import Login from './Login'; 
import Home from './Home'; 
import Forgetpassword from './Forgetpassword'; 
import SeatBooking from "./SeatBooking";
import BookTickets from "./BookTickets";
import Payment from "./Payment";
import ContactPage from "./ContactPage";
import AddTrain from './AddTrain';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path="/Forgetpassword" element={<Forgetpassword />} />
        <Route path="/SeatBooking/:trainNumber" element={<SeatBooking />} />
        <Route path="/book-tickets" element={<BookTickets />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/addTrain" element={<AddTrain />} />

     
      </Routes>
    </BrowserRouter>
  );
}

export default App;

