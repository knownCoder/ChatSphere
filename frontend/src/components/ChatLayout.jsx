import Sidebar from "./Sidebar";
import UsersPanel from "./UsersPanel";
import MessageBubble from "./MessageBubble";
import Dashboard from "./Dashboard";

function ChatLayout({
  messages,
  onlineUsers,
  typingUser,
  message,
  setMessage,
  sendMessage,
  leaveChat,
  handleTyping,
  bottomRef,
  activePage,
  setActivePage,
  stats,
  theme,
  setTheme,
}) {
  return (
    <div className={`chat-layout ${theme}`}>

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="main-chat">

        <div className="chat-header">
          <h2># General Chat</h2>

          <button className="leave-btn" onClick={leaveChat}>
            End Chat
          </button>
        </div>

        {/* ✅ FIXED: Dashboard condition INSIDE return */}
        {activePage === "dashboard" && (
          <Dashboard stats={stats} />
        )}

        {activePage === "chat" && (
          <>
            <div className="messages">
              {messages.map((msg, index) => (
                <MessageBubble key={index} msg={msg} />
              ))}

              <div ref={bottomRef} />
            </div>

            {typingUser && (
              <div className="typing-indicator">
                {typingUser} is typing...
              </div>
            )}

            <div className="input-area">
              <input
                value={message}
                placeholder="Type a message..."
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleTyping();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />

              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}

      </div>

      <UsersPanel onlineUsers={onlineUsers} />
    </div>
  );
}

export default ChatLayout;