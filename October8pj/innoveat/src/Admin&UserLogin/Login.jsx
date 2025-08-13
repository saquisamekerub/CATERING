import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logoo.png';
import './Logindes.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost/Integ_Prog_DBCon/login.php', {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Redirect to admin dashboard if status is Admin
      if (response.data.status === 'Admin') {
        alert('Admin login successful!');
        navigate('/Calendars');
      } else if (response.data.status === 'Success') {
        const user_id = response.data.user_id;
        localStorage.setItem('user_id', user_id);
        alert('Login successful!');
        navigate('/Home');
      } else {
        alert(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Login</h1>
      </div>

      <div className="card">
        <img src={logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <div className="fields">
            <input
              type="email"
              className="input-field"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="fields">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="bottom-texts">
            <Link to='/Signup' className="signup">Sign up Here</Link>
          
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
