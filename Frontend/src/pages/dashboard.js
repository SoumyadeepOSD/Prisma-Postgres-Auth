import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [data, setData] = useState(null);

  
  const decodeToken = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const payload = token.split('.')[1]; 
      const decodedPayload = JSON.parse(atob(payload)); 
      return decodedPayload;     }
    return null;
  };

  const logout = ()=>{
    window.localStorage.setItem("token","");
    window.location.href = "/login";
  }

  useEffect(() => {
    const userData = decodeToken(); 
    setData(userData); 
  }, []);

  if (data) {
    return (
      <div className="flex flex-col items-center justify-center p-3 bg-slate-200 h-screen">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <h2>Welcome {data?.email || "User"}</h2> 
        <p>You are authenticated!</p>
        <button className="text-white bg-blue-800 px-16 rounded-xl py-2 mx-10 mt-5" onClick={logout}>
            Logout
        </button>
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
