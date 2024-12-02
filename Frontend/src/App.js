import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from './provider/auth-provider.js';
import { AppContext } from "./context/appContext.js";
import React, { useState } from 'react';
import Signup from './pages/signup.js';
import Login from './pages/login.js';
import Home from './pages/home.js';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from "./pages/dashboard-layout.js";

const App = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <AppContext.Provider value={{ token, setToken, data, setData, userInfo, setUserInfo }}>
      <Toaster />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard/*"
            element={
              <AuthProvider>
                <DashboardLayout />
              </AuthProvider>
            }
          />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
