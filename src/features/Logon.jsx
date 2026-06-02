import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Logon({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  const {login} = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoggingOn(true)
    try {
    const result = await login(email, password);
    if(!result.success) {
      setAuthError("Error")
    }
    } catch (error) {
      return;
    } finally {
      setIsLoggingOn(false);
    }

  }



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
