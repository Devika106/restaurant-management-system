import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    try {
      const res = await fetch('http://localhost:8001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        alert(data.detail || 'Registration failed');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={handleRegister}>
        Register
      </button>
      <p>
        Already have an account?{' '}
        <a href="#" onClick={() => navigate('/login')}>
          Login here
        </a>
      </p>
    </div>
  );
};

export default Register;
