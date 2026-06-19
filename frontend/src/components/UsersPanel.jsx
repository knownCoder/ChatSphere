function UsersPanel({ onlineUsers }) {
  return (
    <div className="users-panel">
      <h3>Online Users</h3>

      {onlineUsers.map((user, index) => (
        <div key={index} className="user-card">
          🟢 {user}
        </div>
      ))}
    </div>
  );
}

export default UsersPanel;