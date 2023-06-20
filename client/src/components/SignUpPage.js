// SignUpPage.js

import React, { useState, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const navigate = useNavigate();


  const handleSignUp = async (e) => {
    e.preventDefault();
    const newUser = { username, password, email, firstName, lastName };
    
    try {
      const response = await axios.post('/signup', newUser);

      if (response.data.message === "User successfully registered") {
        // Redirect to Login page or other page after successful registration
        navigate('/login');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during signup', error);
    }
  };

  return (
    <div className="signupPage">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
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
        <input 
          type="text" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="First Name" 
          value={firstName} 
          onChange={e => setFirstName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Last Name" 
          value={lastName} 
          onChange={e => setLastName(e.target.value)} 
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
