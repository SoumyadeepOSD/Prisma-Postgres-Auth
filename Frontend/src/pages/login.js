import React, { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const createBasicAuthHeader = (username, password) => {
        const credentials = `${username}:${password}`;
        const base64Credentials = btoa(credentials); // Encode to Base64
        return `Basic ${base64Credentials}`;
    };


    const handleLogin = async () => {
        const userName = "admin";
        const passWord = "password";
        const headers = {
            Authorization: createBasicAuthHeader(userName, passWord),
            'Content-Type': 'application/json',
        };
        setLoading(true);
        try {
            const bodyPayload = {
                "email": email,
                "password": password
            };
            const response = await fetch("http://localhost:5000/api/auth/user-login", {
                method: 'POST',
                headers,
                body: JSON.stringify(bodyPayload)
            });
            if (!response.ok) {
                setLoading(false);
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('Protected Data:', data);
            window.localStorage.setItem("token", data.token);
            window.location.href="/dashboard"
        } catch (error) {
            setLoading(false);
            setError("An Error occured, please try again");
        } finally{
            setLoading(false);
        }
    }


    return (
        <div className="flex flex-col items-center justify-center p-3 bg-slate-200 h-screen">
            <h1 className="text-2xl font-bold">Login</h1>
            <div className="flex flex-col items-start justify-center rounded-lg bg-white mt-5 w-[30%] h-[30%]">
                <div className="flex flex-col w-[80%] mx-auto">
                    <label>Email</label>
                    <input
                        className="border-2 border-slate-600 rounded-md w-[80%]"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>

                <div className="flex flex-col w-[80%] mx-auto">
                    <label>Password</label>
                    <input
                        className="border-2 border-slate-600 rounded-md w-[80%]"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                <button className="text-white bg-blue-800 px-16 rounded-xl py-2 mx-auto mt-5" onClick={handleLogin}>
                    {loading?"Loading":"Login"}
                </button>
                <a href="/signup" className="text-blue-500 text-center mx-auto">
                    <p>Don't have account? Signup</p>
                </a>
            </div>
        </div>
    );
}

export default Login