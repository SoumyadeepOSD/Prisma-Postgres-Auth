import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from './provider/auth-provider.js';
import { AppContext } from "./context/appContext.js";
import Dashboard from './pages/dashboard.js';
import CreatePage from "./pages/create.js";
import UserPage from "./pages/userPage.js";
import React, { useState } from 'react'
import Signup from './pages/signup.js';
import Login from './pages/login.js';
import Home from './pages/home.js';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState([])
  return (
    <AppContext.Provider value={{ token, setToken, data, setData }}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/dashboard"
            element={
              <AuthProvider>
                <Dashboard />
              </AuthProvider>
            } />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
