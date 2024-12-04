import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from './provider/auth-provider.js';
import { AppContext } from "./context/appContext.js";
import React, { useEffect, useState } from 'react';
import Signup from './pages/signup.js';
import Login from './pages/login.js';
import Home from './pages/home.js';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from "./pages/dashboard-layout.js";
import getTagData from "./utils/fetchData.js";

const App = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [tags, setTags] = useState([]);

  const fetchData = async () => {
    if (userInfo) {
      const tags = await getTagData({ id: userInfo?.id });
      setTags(tags);
    }
  };

  useEffect(()=>{
    fetchData();
  },[tags.length]);


  return (
    <AppContext.Provider value={{ token, setToken, data, setData, userInfo, setUserInfo, tags, setTags }}>
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
