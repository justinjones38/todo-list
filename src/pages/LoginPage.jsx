import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const path = useLocation();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/todos" />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoggingOn(true);
    try {
      const result = await login(email, password);
      if (!result.success) {
        throw new Error();
      }

      if (path.state?.pathname) {
        navigate(path.state?.pathname);
      } else {
        navigate("/todos");
      }
    } catch (error) {
      setAuthError("Cannot log in");
      return;
    } finally {
      setIsLoggingOn(false);
    }
  };

  return (
    <div>
      {authError ? <p>{authError}</p> : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          required
        />

        <button disabled={isLoggingOn}>
          {isLoggingOn ? "Logging in" : "Log on"}
        </button>
      </form>
    </div>
  );
}
