function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="sidebar">

      <div className="logo">ChatApp</div>

      {/* Chat */}
      <div
        className={`menu-item ${activePage === "chat" ? "active" : ""}`}
        onClick={() => setActivePage("chat")}
      >
        💬 Chat
      </div>

      {/* Dashboard */}
      <div
        className={`menu-item ${activePage === "dashboard" ? "active" : ""}`}
        onClick={() => setActivePage("dashboard")}
      >
        📊 Dashboard
      </div>

    </div>
  );
}

export default Sidebar;