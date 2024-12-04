import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import HeaderComponent from "../components/header";
import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./dashboard";
import CreatePage from "./create";
import UserPage from "./userPage";
import SelectPage from "./select";

// const About = () => <div className="text-black">About Page</div>;
const Contact = () => <div className="text-black">Contact Page</div>;

const DashboardLayout = () => {
    const [data, setData] = useState(null);
    const { token, userInfo, setUserInfo } = useContext(AppContext);

    const decodeToken = (token) => {
        if (token) {
            const payload = token.split(".")[1];
            const decodedPayload = JSON.parse(atob(payload));
            return decodedPayload;
        }
        return null;
    };

    useEffect(() => {
        const userData = decodeToken(token);
        setUserInfo(userData);
        setData(userData);
    }, [token, setUserInfo]);

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center p-3 bg-slate-200 h-screen">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <h2>Loading...</h2>
                <p>Fetching user data...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start p-3 bg-slate-200 h-screen">
            {/* Header is always visible */}
            <HeaderComponent />
            {/* Render the matching child routes */}
            <Routes>
                <Route index element={<Dashboard userInfo={userInfo} />} />
                <Route path="create" element={<CreatePage />} />
                <Route path="select" element={<SelectPage />} />
                <Route path="contact" element={<Contact />} />
                <Route path="tag-view" element={<UserPage />} />
            </Routes>
            <Outlet />
        </div>
    );
};

export default DashboardLayout;
