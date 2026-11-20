import { useState } from "react";

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    // Request the login page with the username and password - placeholder fetch call for now
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const payload = await response.json();

    // Error handler
    if (!response.ok) {
      setError(payload.message || "Login failed");
      return;
    }

    // Collecting the token and user from the payload
    const { token, user } = payload.data;
    // Setting the token into localStorage
    localStorage.setItem("token", token);
    // Running our successful login function
    onLoginSuccess?.({ token, user });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && <p role="alert">{error}</p>}

      <button type="submit">Log in</button>
    </form>
  );
}