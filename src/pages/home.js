import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center p-3 bg-slate-200 h-screen">
      <h1 className="text-2xl font-bold">Home</h1>
      <div className="flex flex-row items-center justify-center gap-5">
        <a href="/login">
          <p className="text-blue-500 text-center">Login</p>
        </a>
        <a href="/dashboard">
          <p className="text-blue-500 text-center">Dashboard</p>
        </a>
      </div>
    </div>
  );
}

export default Home;

