import { useState } from "react";

export default function Logon({
  onSetEmail,
  onSetToken
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/users/logon`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (res.status === 200 && data.name && data.csrfToken) {
        onSetEmail(data.name);
        onSetToken(data.csrfToken);
      } else {
        setAuthError(`Authentication failed: ${data?.message}`);
      }
    } catch(error) {
      setAuthError(`Error ${error.name} | ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  console.log(email, password);

  return (
    <div>
      {authError ? <p>Cannot locate account</p> : null}
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" />
      <label htmlFor="password">Password</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button disabled={loading}>{loading ? "Logging in" : "Log on"}</button>
    </form>
    </div>

  )
}
