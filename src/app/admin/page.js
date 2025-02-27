"use client"

import { useEffect, useState } from "react";
import "./admin.css"
import UploadGame from "@/components/UploadGame/UploadGame";
import Login from "@/components/Login/Login";
import AddAdmin from "@/components/AddAdmin/AddAdmin";
import { jwtDecode } from "jwt-decode";
import DeleteAdmin from "@/components/DeleteAdmin/DeleteAdmin";
import DeleteGame from "@/components/DeleteGame/DeleteGame";

const Admin = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSuperUser, setIsSuperUser] = useState(false);
    const [currentView, setCurrentView] = useState("");


    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        const super_access = localStorage.getItem('super_access');

        const isTokenExpired = (token) => {
            try {
                const { exp } = jwtDecode(token);
                return Date.now() >= exp * 1000;
            } catch (error) {
                return true;
            }
        };

        if (!access_token || isTokenExpired(access_token)) {
            handleLogout();
            return;
        }


        setIsLoggedIn(true)
        setIsSuperUser(super_access)

    }, [])

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('super_access');
        setIsLoggedIn(false);
        setIsSuperUser(false);
        setCurrentView("");
    }

    if (!isLoggedIn) {
        return <Login setIsLoggedIn={setIsLoggedIn} setIsSuperUser={setIsSuperUser} />;
    }

    return (
        <div className="admin-container">
            <div className="admin-card">
                <div className="admin-header">
                    <h2 className="admin-title">Admin Panel</h2>
                    <button onClick={handleLogout} className="admin-logout">Logout</button>
                </div>
                <div className="admin-body">
                    <div className="admin-buttons">
                        <button onClick={() => setCurrentView("uploadGame")} className="admin-btn">Upload Game</button>
                        {isSuperUser && (
                            <>
                                <button onClick={() => setCurrentView("deleteGame")} className="admin-btn">Delete Game</button>
                                <button onClick={() => setCurrentView("addAdmin")} className="admin-btn">Add Admin</button>
                                <button onClick={() => setCurrentView("deleteAdmin")} className="admin-btn">Delete Admin</button>
                            </>
                        )}
                    </div>

                    <div className="admin-content">
                        {currentView === "uploadGame" && <UploadGame />}
                        {currentView === "deleteGame" && <DeleteGame />}
                        {currentView === "addAdmin" && <AddAdmin />}
                        {currentView === "deleteAdmin" && <DeleteAdmin />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;