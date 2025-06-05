import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Billing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const food = location.state;

  const handlePayment = () => {
    navigate('/success');
  };

  if (!food) {
    return <p>No billing info available.</p>;
  }

  return (
    <div className="container">
      <h2>Billing</h2>
      <h3>Item: {food.name}</h3>
      <p>Total Amount: ₹{food.price}</p>
      <button className="button" onClick={handlePayment}>Billing</button>
    </div>
  );
};

export default Billing;
