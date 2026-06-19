from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
from datetime import datetime

app = FastAPI()

# ---------------- STATE ----------------
total_messages = 0
messages_today = 0
users = {}   # websocket -> username
clients = []

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- ROUTE ----------------
@app.get("/")
def home():
    return {"message": "WebSocket Chat Backend Running"}

# ---------------- BROADCAST ----------------
async def broadcast(data):
    disconnected = []

    for client in clients:
        try:
            await client.send_text(json.dumps(data))
        except:
            disconnected.append(client)

    for client in disconnected:
        if client in clients:
            clients.remove(client)
        if client in users:
            del users[client]

# ---------------- WEBSOCKET ----------------
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    global total_messages, messages_today

    await websocket.accept()
    clients.append(websocket)

    username = "Anonymous"

    try:
        while True:
            raw_data = await websocket.receive_text()
            data = json.loads(raw_data)

            # ---------------- JOIN ----------------
            if data["type"] == "join":
                username = data["username"]
                users[websocket] = username

                await broadcast({
                    "type": "system",
                    "message": f"🟢 {username} joined the chat",
                    "time": datetime.now().strftime("%H:%M")
                })

                await broadcast({
                    "type": "users",
                    "users": list(users.values())
                })

                await broadcast({
                    "type": "stats",
                    "total_messages": total_messages,
                    "online_users": len(users),
                    "messages_today": messages_today
                })

            # ---------------- MESSAGE ----------------
            elif data["type"] == "message":
                total_messages += 1
                messages_today += 1

                await broadcast({
                    "type": "message",
                    "username": username,
                    "message": data["message"],
                    "time": datetime.now().strftime("%H:%M")
                })

                await broadcast({
                    "type": "stats",
                    "total_messages": total_messages,
                    "online_users": len(users),
                    "messages_today": messages_today
                })

            # ---------------- TYPING ----------------
            elif data["type"] == "typing":
                await broadcast({
                    "type": "typing",
                    "username": username
                })

    # ---------------- DISCONNECT ----------------
    except WebSocketDisconnect:

        if websocket in clients:
            clients.remove(websocket)

        if websocket in users:
            username = users[websocket]
            del users[websocket]

        await broadcast({
            "type": "users",
            "users": list(users.values())
        })

        await broadcast({
            "type": "system",
            "message": f"🔴 {username} left the chat",
            "time": datetime.now().strftime("%H:%M")
        })

        await broadcast({
            "type": "stats",
            "total_messages": total_messages,
            "online_users": len(users),
            "messages_today": messages_today
        })