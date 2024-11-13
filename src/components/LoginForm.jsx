// src/components/LoginForm.jsx
import React, { useState } from "react";

const LoginForm = ({ handleSignIn, handleSignUp, handleForgotPassword }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetFormVisible, setIsResetFormVisible] = useState(false); // Shows reset form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handles switching between Sign In and Sign Up forms
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignUp) {
      handleSignUp(email, password);
    } else {
      handleSignIn(email, password);
    }
  };

  // Shows the email input for password reset
  const handleForgotPasswordClick = () => {
    setIsResetFormVisible(true);
  };

  // Sends the reset password email
  const handleResetPasswordSubmit = async (event) => {
    event.preventDefault();
    await handleForgotPassword(email); // Calls the reset function with email
  };

  return (
    <div className="login-form-container">
      {!isResetFormVisible ? ( // Display Sign In/Up form if reset form isn't visible
        <form onSubmit={handleSubmit} className="login-form">
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? " Sign In" : " Sign Up"}
            </span>
          </p>
          <p>
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={handleForgotPasswordClick} // Show reset form on click
            >
              Forgot Password?
            </span>
          </p>
        </form>
      ) : (
        // Show Reset Password Form when reset form is visible
        <form onSubmit={handleResetPasswordSubmit} className="reset-form">
          <h2>Reset Password</h2>
          <div className="form-group">
            <label htmlFor="reset-email">Enter your email to reset password:</label>
            <input
              type="email"
              id="reset-email"
              name="reset-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="btn" type="submit">
            Send Reset Email
          </button>
          <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => setIsResetFormVisible(false)} // Go back to Sign In/Up form
          >
            Back to Login
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginForm;