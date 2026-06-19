import CountUp from "./CountUp";

function Dashboard({ stats }) {
  return (
    <div className="dashboard">

      <div className="stat-card">
        <h3>Total Messages</h3>
        <p><CountUp value={stats.total_messages} /></p>
      </div>

      <div className="stat-card">
        <h3>Online Users</h3>
        <p><CountUp value={stats.online_users} /></p>
      </div>

      <div className="stat-card">
        <h3>Messages Today</h3>
        <p><CountUp value={stats.messages_today} /></p>
      </div>

    </div>
  );
}

export default Dashboard;