// Navbar.js

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { useDebouncedCallback } from 'use-debounce'; // need to install this package
import '../styles/Navbar.css';
import { SearchResultContext } from '../contexts/SearchResultContext';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const { setSearchResult } = useContext(SearchResultContext);
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleSearch = useDebouncedCallback(async () => {
    try {
      if (searchInput.trim() === '') {
        // If search input is empty, clear search result and exit
        setSearchResult(null);
        return;
      }

      const response = await axios.post('/search', { itemName: searchInput });
      console.log(response.data);

      if (response.data.items) {
        // Set the search result to the state
        setSearchResult(response.data.items);
        // Redirect to the items page
        navigate('/items');
      }
    } catch (error) {
      console.error(error);
    }
  }, 300); // 300ms debounce

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    handleSearch();
  };

  const handleLogin = () => {
    navigate("/login"); // Navigate to login route
  };

  const handleLogout = () => {
    // Clear the auth token
    localStorage.removeItem('authToken');
    // Clear the user state
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="navbar">
      <h1>This is a simple Navbar</h1>
      <Link to="/">
        <button className="navButton">Home</button>
      </Link>
      <form onSubmit={e => e.preventDefault()}>
        <input 
          type="text" 
          placeholder="Search"
          value={searchInput} 
          onChange={handleInputChange} 
        />
        <button type="submit" className="navButton" onClick={handleSearch}>Search</button>
      </form>
      {
        isLoggedIn ? 
        <button className="navButton" onClick={handleLogout}>Logout</button>
        :
        <button className="navButton" onClick={handleLogin}>Login</button>
        
      }

      <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <div className="dropdown-content">
          <Link to="/items">Go To Items</Link>
          <Link to="/signup"> Signup</Link>
          {isLoggedIn && (
            <Link to="/cart">
              <button className="navButton">My Cart</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
