import { useState, useEffect, useRef } from "react";
import Login from "./components/Login";
import ChatLayout from "./components/ChatLayout";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);

  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  const [activePage, setActivePage] = useState("chat");
  const [theme, setTheme] = useState("dark");

  const [stats, setStats] = useState({
    total_messages: 0,
    online_users: 0,
    messages_today: 0,
  });

  const bottomRef = useRef(null);

  // ---------------- SOCKET INIT ----------------
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "users") {
        setOnlineUsers(data.users);
        return;
      }

      if (data.type === "typing") {
        setTypingUser(`${data.username} is typing...`);

        setTimeout(() => {
          setTypingUser("");
        }, 1500);

        return;
      }

      if (data.type === "stats") {
        setStats(data);
        return;
      }

      setMessages((prev) => [...prev, data]);
    };

    setSocket(ws);

    return () => ws.close();
  }, []);

  // ---------------- AUTO SCROLL ----------------
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ---------------- TYPING ----------------
  const handleTyping = () => {
    if (!socket) return;

    socket.send(
      JSON.stringify({
        type: "typing",
      })
    );
  };

  // ---------------- JOIN CHAT ----------------
  const joinChat = () => {
    if (!username.trim() || !socket) return;

    socket.send(
      JSON.stringify({
        type: "join",
        username,
      })
    );

    setJoined(true);
  };

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = () => {
    if (!message.trim() || !socket) return;

    socket.send(
      JSON.stringify({
        type: "message",
        message,
      })
    );

    setMessage("");
  };

  // ---------------- LEAVE CHAT ----------------
  const leaveChat = () => {
    if (socket) {
      socket.close();
    }

    setJoined(false);
    setMessages([]);
    setOnlineUsers([]);
    setTypingUser("");
    setStats({
      total_messages: 0,
      online_users: 0,
      messages_today: 0,
    });
  };

  // ---------------- LOGIN SCREEN ----------------
  if (!joined) {
    return (
      <Login
        username={username}
        setUsername={setUsername}
        joinChat={joinChat}
      />
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <ChatLayout
      messages={messages}
      onlineUsers={onlineUsers}
      typingUser={typingUser}
      message={message}
      setMessage={setMessage}
      sendMessage={sendMessage}
      leaveChat={leaveChat}
      handleTyping={handleTyping}
      bottomRef={bottomRef}
      activePage={activePage}
      setActivePage={setActivePage}
      stats={stats}
      theme={theme}
      setTheme={setTheme}
    />
  );
}

export default App;