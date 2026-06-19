function Login({ username, setUsername, joinChat }) {
  return (
    <div className="login-page">

      <div className="login-left">
        <h1>ChatSphere</h1>

        <p>
          Real-Time Messaging for Modern Teams
        </p>

        <div className="feature">
          ⚡ Instant Communication
        </div>

        <div className="feature">
          👥 Online Presence
        </div>

        <div className="feature">
          🔒 Secure & Reliable
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">

          <h2>Welcome Back</h2>

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <button onClick={joinChat}>
            Join Chat
          </button>

        </div>
      </div>

    </div>
  );
}

export default Login;