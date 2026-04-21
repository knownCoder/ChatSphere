# 💬 Python Socket Chat App (Beginner Project)

A simple **client-server chat application** built using Python sockets.
This project demonstrates **basic networking, real-time communication, and socket programming concepts**.

---

## 🚀 Features

* 🔌 Client-Server connection using sockets
* 💬 Two-way communication (chat-like system)
* 🔁 Continuous messaging using loops
* ❌ Exit chat using `bye` command
* 🧠 Built using only Python standard library (no external dependencies)

---

## 🛠️ Tech Stack

* Python 🐍
* Socket Programming
* TCP (Transmission Control Protocol)

---

## 📁 Project Structure

```
socket_chat_step2/
│
├── server.py   # Server-side code
└── client.py   # Client-side code
```

---

## ⚙️ How It Works

1. Server starts and listens on a specific IP and port
2. Client connects to the server
3. Client sends message → Server receives
4. Server replies → Client receives
5. Process continues until `bye` is entered

---

## ▶️ How to Run

### 1. Clone the repository

```
git clone https://github.com/your-username/socket-chat-app.git
cd socket-chat-app
```

---

### 2. Run Server

```
python server.py
```

or (Linux/Mac):

```
python3 server.py
```

---

### 3. Run Client (in new terminal)

```
python client.py
```

---

## 💬 Example Chat

**Client:**

```
You: hello
```

**Server:**

```
Client: hello
You: hi
```

**Client:**

```
Server: hi
```

---

## ⚠️ Important Notes

* Run **server first**, then client
* Uses local host: `127.0.0.1`
* Default port: `12345`
* Only supports **1 client at a time** (for now)

---

## 🧠 Concepts Learned

* Socket creation (`socket()`)
* Binding and listening (`bind()`, `listen()`)
* Connection handling (`accept()`)
* Sending/Receiving data (`send()`, `recv()`)
* Encoding/Decoding data
* Infinite loops for continuous communication

---

## 🔮 Future Improvements

* 🔥 Multi-client support using threading
* 🎨 GUI using Tkinter or React
* 🌐 Upgrade to WebSockets (FastAPI integration)
* 🔐 Add authentication (username/password)

---

## 🙌 Author

**Swapnil**

* 💻 Backend Developer (Fresher)
* 🚀 Learning Socket Programming & FastAPI

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share with others!
