import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from './provider/auth-provider.js';
import Dashboard from './pages/dashboard.js';
import Signup from './pages/signup.js';
import Login from './pages/login.js';
import Home from './pages/home.js';
import React, { useState } from 'react'
import { AppContext } from "./context/appContext.js";

const App = () => {
  const [token, setToken] = useState("");
  return (
    <AppContext.Provider value={{token, setToken}}>
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
  </AppContext.Provider>
  );
}

export default App;
