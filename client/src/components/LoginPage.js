// LoginPage.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const credentials = { username, password };
    console.log('Sending login request with credentials:', credentials);
  
    try {
      const response = await axios.post('/login', credentials);
  
      console.log('Received response:', response.data);
  
      if (response.data.data && response.data.data.token) {
        // Save token to local storage
        localStorage.setItem('authToken', response.data.data.token);
        
        // Set logged in user and auth state
        setIsLoggedIn(true);
        setUser(response.data.data.user);  // or setUser(username) depending on your API response
        
        // Redirect to Home page or other page after successful login
        navigate('/');
      } else {
        alert('Invalid username or password');
      }
  
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="loginPage">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default LoginPage;
