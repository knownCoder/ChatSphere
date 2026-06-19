function MessageBubble({ msg }) {
  if (msg.type === "system") {
    return (
      <div className="system-message">
        {msg.message}
      </div>
    );
  }

  return (
    <div className="message-bubble">
      <div className="message-user">
        {msg.username}
      </div>

      <div>
        {msg.message}
      </div>

      <div className="message-time">
        {msg.time}
      </div>
    </div>
  );
}

export default MessageBubble;