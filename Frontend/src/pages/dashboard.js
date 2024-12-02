import React from 'react'

const Dashboard = ({userInfo}) => {
  return (
    <div className="text-black flex flex-col items-center">
        <h1 className="text-2xl font-bold my-5">Dashboard</h1>
        <h2>Welcome {userInfo?.email || "User"}</h2> 
        <p>You are authenticated!</p>
    </div>
  )
}

export default Dashboard