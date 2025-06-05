import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8001/food')
      .then(res => res.json())
      .then(data => setFoods(data));
  }, []);

  const handleOrderNow = (food) => {
    
    navigate('/order', { state: food });
  };

  return (
    <div className="container">
      <h2>Menu</h2>
      {foods.map(food => (
        <div key={food.id} className="card">
          <h3>{food.name}</h3>
          <img src={food.image_url} alt={food.name} width="200" />
          <p>₹{food.price}</p>
          <button className="button" onClick={() => handleOrderNow(food)}>Order Now</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
