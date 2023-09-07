import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const handleLogin = (user) => {
    setAuthenticatedUser(user);
  };


  return (
    <Router>
      <div className="App">
        <h1>Collaborative Task Management App</h1>

          <Login onLogin={handleLogin} isAuthenticated={authenticatedUser} />
        

        <Routes>
          {/* Authenticated routes */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
