import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Items from './components/Items';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Cart from './components/Cart';
import AuthContext from './contexts/AuthContext';
import { SearchResultContext } from './contexts/SearchResultContext';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;


function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      setUser({}); // Update this to set user data if you have any
    }
  }, []);

  return (
    <Router>
      <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
          <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<Items />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        </AuthContext.Provider>
      </SearchResultContext.Provider>
    </Router>
  );
}

export default App;
