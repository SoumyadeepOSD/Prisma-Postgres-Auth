import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from './provider/auth-provider.js';
import Dashboard from './pages/dashboard.js';
import Signup from './pages/signup.js';
import Login from './pages/login.js';
import Home from './pages/home.js';
import React from 'react'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <AuthProvider>
              <Dashboard />
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
