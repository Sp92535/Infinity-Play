"use client";
import { useState } from "react";
import axios from "axios";
import "./AddAdmin.css";

const AddAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showMessage("error", "Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "/api/register",
        { username, password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      showMessage("success", response.data.message);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "An error occurred while creating the admin.";
      showMessage("error", errorMsg);
    }
  };

  return (
    <div className="add-admin-container">
      <div className="add-admin-card">
        <h2>Add New Admin</h2>
        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="toggle-password-wrapper">
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" className="btn-success">
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
