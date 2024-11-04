import React, { useState } from "react";

const LoginForm = ({ handleSignIn, handleSignUp }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    if (!email || !password) {
      alert("Email and password must be provided."); // Alert for missing fields
      return;
    }

    // Call appropriate function based on whether it's sign-up or sign-in
    if (isSignUp) {
      handleSignUp(email, password); // Pass email and password
    } else {
      handleSignIn(email, password); // Pass email and password
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>
        <button className="btn" type="submit">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <p>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => setIsSignUp(!isSignUp)} // Toggle between sign-up and sign-in
          >
            {isSignUp ? " Sign In" : " Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
