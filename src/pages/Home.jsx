import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

const handleOrderFood = () => {
  const isLoggedIn = Boolean(localStorage.getItem('user_id'));
  if (isLoggedIn) {
    navigate('/menu');
  } else {
    navigate('/login', { state: { from: '/menu' } });
  }
};

const handleBookTable = () => {
  const isLoggedIn = Boolean(localStorage.getItem('user_id'));
  if (isLoggedIn) {
    navigate('/book-table');
  } else {
    navigate('/login', { state: { from: '/book-table' } });
  }
};

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/');
  };

  return (
    <div className="section" >
      <h1  > Food House </h1>
      <p >"Where every meal is a celebration of flavor!"</p>

      <div className="section">
        <h2>Our Vision</h2>
        <p>
          To be the most loved and trusted destination for food lovers,
          delivering culinary excellence and unforgettable dining experiences.
        </p>
      </div>

      <div className="section">
        <h2>Our Mission</h2>
        <p>
          At Gourmet Delights, we are committed to using fresh ingredients,
          innovative recipes, and outstanding hospitality to serve food that
          delights our customers and makes them feel at home.
        </p>
      </div>

      <div className="container">
        <button className="button" onClick={handleOrderFood}>
          Order Food
        </button>
        <button className="button" onClick={handleBookTable}>
          Book Table
        </button>
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
