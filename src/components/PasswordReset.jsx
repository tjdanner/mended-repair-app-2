// src/components/PasswordReset.jsx
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useLocation } from "react-router-dom";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash.includes("error")) {
      setNotification({ message: "Invalid or expired link.", type: "error" });
    }
  }, [location]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotification({ message: "Passwords do not match.", type: "error" });
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setNotification({ message: `Error resetting password: ${error.message}`, type: "error" });
    } else {
      setNotification({ message: "Password reset successfully.", type: "success" });
    }
  };

  return (
    <div className="password-reset-container">
      <form onSubmit={handlePasswordReset} className="password-reset-form">
        <h2>Reset Password</h2>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn" type="submit">
          Reset Password
        </button>
        {notification.message && (
          <p className={`notification ${notification.type}`}>{notification.message}</p>
        )}
      </form>
    </div>
  );
};

export default PasswordReset;