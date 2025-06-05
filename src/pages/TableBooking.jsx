import React, { useState, useEffect } from 'react';

const TableBooking = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:8001/');
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError('Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!tableNumber || !date || !time || seats < 1) {
      setMessage('Please fill in all fields correctly.');
      return;
    }

    const bookingData = {
      table_number: tableNumber,
      date,
      time,
      seats,
    };

    try {
      const response = await fetch('http://localhost:8001/book-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      setMessage(result.message);

      
      const res = await fetch('http://localhost:8001/');
      const data = await res.json();
      setBookings(data);

      
      setTableNumber('');
      setDate('');
      setTime('');
      setSeats(1);
    } catch (err) {
      setMessage('Booking failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="section-title"> Book a Table</h2>

      <form onSubmit={handleBooking} className="form">
        <label>
          Table Number:
          <input
            type="text"
            placeholder="Table Number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label>
          Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>

        <label>
          Seats:
          <input
            type="number"
            placeholder="Seats"
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            required
          />
        </label>

        <button className="button" type="submit">Book Table</button>
      </form>

      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading bookings...</p>}

      <h3 className="section-subtitle"> Current Bookings</h3>
      {bookings.length > 0 ? (
        bookings.map((booking, idx) => (
          <div key={idx} className="card">
            <p><strong>Table:</strong> {booking.table_number}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Seats:</strong> {booking.seats}</p>
          </div>
        ))
      ) : (
        !loading && <p>No bookings yet.</p>
      )}
    </div>
  );
};

export default TableBooking;
