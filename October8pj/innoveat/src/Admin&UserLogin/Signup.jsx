import React, { useState } from 'react';
import './Logindes.css';
import { Link } from 'react-router-dom';
import logo from './logoo.png';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Signup() {
  const [username, setUsername] = useState('');  // For the username input
  const [email, setEmail] = useState('');        // For the email input
  const [password, setPassword] = useState('');  // For the password input
  const [showPassword, setShowPassword] = useState(false);  // To toggle password visibility
  const [loading, setLoading] = useState(false);  // To handle loading state during submission

  const [cookies,setCookies, removeCookies] =useCookies(['innoveat']);

  
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setLoading(true);  // Set loading state to true
  
    // Validate form fields
    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      setLoading(false);
      return;
    }
  
    // Data to be sent to the server
    const inputs = {
      username: username,      // Match 'username' for the PHP script
      email: email,            // Match 'email' field
      password: password        // Match 'password' field
    };
  
    console.log("Inputs to send:", inputs);
  
    try {
      // Send signup data using Axios
      const response = await axios.post('http://localhost/Integ_Prog_DBCon/register.php', inputs, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log("Response from server:", response.data);
  
      // Check the response from the server
      if (response.data && response.data.status === 'Success') {
        const user_id = response.data.user_id;  // Get user_id from response
        localStorage.setItem('user_id', user_id);  // Store user_id in localStorage
        alert('Signup successful!');
        
        // You could navigate to another page after signup here
      } else {
        alert(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('There was an error!', error);
  
      // Handle errors and provide user feedback
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'An error occurred. Please try again later.');
      } else {
        alert('An error occurred. Please check your network connection and try again.');
      }
    } finally {
      setLoading(false);  // Stop loading when request finishes
    }
  };

  return (
    <div className="container1">
      <div className="login1">
        <h1>Sign up</h1>
      </div>
      <div className="card1">
        <img src={logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <div className="fields1">
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Bind input value to username state
              required
            />
          </div>
          <div className="fields1">
            <input
              type="email"
              className="input-field"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Bind input value to email state
              required
            />
          </div>
          <div className="fields1 password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Bind input value to password state
              required
            />
            {/* Button to toggle password visibility */}
            <button
              type="button"
              className="show-password-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          <div className="bottom-texts">
            <Link to='/' className="backbtn3">Back</Link> {/* Link to navigate back */}
          </div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'} {/* Show loading state in button */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
