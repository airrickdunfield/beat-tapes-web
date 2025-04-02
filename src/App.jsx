import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

// Import our authentication HOC
import authRequired from './authRequired';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import AllTapes from './pages/AllTapes';
import Tape from './pages/Tape';

// Create components by passing the pages into Auth Required
const ProtectedAllTapes = authRequired(AllTapes);
const ProtectedTape = authRequired(Tape);

import a from './App.module.css';

function App() {

  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Passed into the header to log out
  const handleLogout = () => {
    
    localStorage.removeItem("jwt-token");
    setIsAuthenticated(false);
    
    navigate("/sign-in");

  }

  // Passed into the header to Sign-in page to login
  const handleLogin = () => {

    setIsAuthenticated(true);
    navigate("/tapes");

  }

  // When the page loads, check if the user has a token
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token");

    if(jwtToken) {
      setIsAuthenticated(true);
    }

  }, []);

  return (
    
    <div className={a.app}>
      <Header handleLogout={handleLogout} isAuthenticated={isAuthenticated} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" 
          element={<SignIn handleLogin={handleLogin} />} />
        <Route path="/tapes" element={<ProtectedAllTapes />} />
        <Route path="/tapes/:id" element={<ProtectedTape />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App;
