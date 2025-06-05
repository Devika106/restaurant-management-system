import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const food = location.state;

  const handleNext = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('You must be logged in to place an order.');
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:8001/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseInt(userId),
          items: [food.name],
          total_price: food.price
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Order placed successfully');
        navigate('/billing', { state: food });
      } else {
        alert(data.message || 'Order failed');
      }
    } catch (err) {
      alert('Error placing order: ' + err.message);
    }
  };

  if (!food) {
    return <p>No food item selected.</p>;
  }

  return (
    <div className="container">
      <h2>Order Information</h2>
      <h3>{food.name}</h3>
      <p>Price: ₹{food.price}</p>
      <button className="button" onClick={handleNext}>Confirm Order</button>
    </div>
  );
};

export default Order;
