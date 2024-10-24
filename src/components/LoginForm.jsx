import { useState } from "react";

const LoginForm = ({ email, setEmail, password, setPassword, handleSignIn, handleSignUp }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="login-form">
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
    </form>
  );
};

export default LoginForm;
