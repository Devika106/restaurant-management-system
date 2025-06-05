// Login.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    try {
      const res = await fetch('http://localhost:8001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user_id', data.user?.id || data.user_id);

        // Redirect to the original intended path or /menu
        const redirectPath = location.state?.from || '/menu';
        navigate(redirectPath);
      } else {
        alert(data.detail || 'Login failed');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
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
      <button className="button" onClick={handleLogin}>
        Login
      </button>
      <p>
        Don’t have an account?{' '}
        <a href="#" onClick={() => navigate('/register')}>
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
