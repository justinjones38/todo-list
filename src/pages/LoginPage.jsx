import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import styles from "./LoginPage.module.css";
import { sanitizeInput } from "../utils/sanitizeInput";

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
    setEmail((prev) => sanitizeInput(prev));
    setPassword((prev) => sanitizeInput(prev));
    try {
      const result = await login(email, password);
      if (!result.success) {
        setEmail("");
        setPassword("");
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
    <div className={styles.container}>
      {authError ? <p className={styles.errorText}>{authError}</p> : null}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formElements}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            required
            className={styles.input}
            placeholder="Enter Email"
            maxLength={50}
          />
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            required
            className={styles.input}
            placeholder="Enter password"
            maxLength={20}
          />
        </div>
        <button disabled={isLoggingOn} className={styles.loginBtn}>
          {isLoggingOn ? "Logging in" : "Log In"}
        </button>
      </form>
    </div>
  );
}
