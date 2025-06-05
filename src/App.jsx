import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import TableBooking from "./pages/TableBooking";
import Billing from "./pages/Billing";
import Success from "./pages/Success";

function App() {
  const isLoggedIn = Boolean(localStorage.getItem("user_id"));

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/menu" element={isLoggedIn ? <Menu /> : <Navigate to="/login" />} />
      <Route path="/Order" element={isLoggedIn ? <Order /> : <Navigate to="/login" />} />
      <Route path="/book-table" element={isLoggedIn ? <TableBooking /> : <Navigate to="/login" />} />
      <Route path="/billing" element={isLoggedIn ? <Billing /> : <Navigate to="/login" />} />
      <Route path="/success" element={isLoggedIn ? <Success /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
