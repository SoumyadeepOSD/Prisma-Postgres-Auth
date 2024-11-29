import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/appContext';
import HeaderComponent from '../components/header';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const {token} = useContext(AppContext);
  

  const decodeToken = (token) => {
    if (token) {
      const payload = token.split('.')[1]; 
      const decodedPayload = JSON.parse(atob(payload)); 
      return decodedPayload; 
    }
    return null;
  };


  useEffect(() => {
    const userData = decodeToken(token); 
    setData(userData); 
  }, [token]);



  if (data) {
    return (
      <div className="flex flex-col items-center justify-start p-3 bg-slate-200 h-screen">
        <HeaderComponent/>
        <h1 className="text-2xl font-bold my-5">Dashboard</h1>
        <h2>Welcome {data?.email || "User"}</h2> 
        <p>You are authenticated!</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center p-3 bg-slate-200 h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <h2>Loading...</h2>
      <p>Fetching user data...</p>
    </div>
  );
};

export default Dashboard;
