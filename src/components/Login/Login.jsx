"use client"
import { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = ({ setIsLoggedIn, setIsSuperUser }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        setLoading(true);
        setError(''); // Clear any previous error messages

        try {
            const response = await axios.post(
                "/api/login",
                JSON.stringify({ username, password }),
                {
                    validateStatus: () => true, // Accept all response statuses
                    headers: { "Content-Type": "application/json" } // Ensure JSON request
                }
            );
    
            const data = response.data;
            console.log(data);
    
            if (data.success) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('super_access', data.vip); // Store super access
                setIsSuperUser(data.vip);
                setIsLoggedIn(true);
            } else {
                setError(data.message);
            }

        } catch (error) {
            setError("ERROR");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
export default Login;