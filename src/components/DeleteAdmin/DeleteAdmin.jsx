"use client";
import { useState } from "react";
import axios from "axios";
import "./DeleteAdmin.css";
import Confirmation from "../Confirmation/Confirmation";

const DeleteAdmin = () => {
    const [username, setUsername] = useState("");
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [confirmDeleteUsername, setConfirmDeleteUsername] = useState(null);

    // Handle Admin Search
    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.get(`/api/search-admin`, {
                params: { q: username },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            setAdmins(response.data.admins);
            if (response.data.admins.length === 0) {
                setError("No such admins found.");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch admins.");
        }

        setTimeout(() => {
            setError(null);
            setSuccess(null);
        }, 3000);
    };

    // Confirm Deletion Popup
    const handleDeleteClick = (adminUsername) => {
        setConfirmDeleteUsername(adminUsername);
    };

    // Handle Admin Deletion
    const handleDelete = async () => {
        if (!confirmDeleteUsername) return;
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.delete(`api/delete-admin`, {
                data: { username: confirmDeleteUsername },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            setSuccess(response.data.message);
            setAdmins(admins.filter((admin) => admin !== confirmDeleteUsername));
        } catch (err) {
            setError(err.response?.data?.error || "Failed to delete admin.");
        } finally {
            setConfirmDeleteUsername(null);
        }
    };

    return (
        <div className="delete-admin">
            <h2>Delete Admin</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <label htmlFor="username">Search by Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Search Admins</button>
            </form>

            {admins.length > 0 && (
                <div className="admin-list">
                    <h3>Matched Admins:</h3>
                    <ul>
                        {admins.map((admin) => (
                            <li key={admin._id} className="admin-item">
                                <span className="admin-username">{admin.username}</span>
                                <button className="btn btn-danger" onClick={() => handleDeleteClick(admin.username)}>Delete</button>
                            </li>
                        ))}

                    </ul>
                </div>
            )}

            {confirmDeleteUsername && <Confirmation handleDelete={handleDelete} setConfirm={setConfirmDeleteUsername}/>}
        </div>
    );
};

export default DeleteAdmin;
