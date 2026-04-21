import socket

HOST = "127.0.0.1"
PORT = 12345

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

server_socket.bind((HOST, PORT))
server_socket.listen(1)

print("Server started...")
print(f"Listening on {HOST}:{PORT}")

conn, addr = server_socket.accept()
print(f"Connected by {addr}")

while True:
    client_message = conn.recv(1024).decode()

    if not client_message:
        print("Client disconnected.")
        break

    print(f"Client: {client_message}")

    server_reply = input("You: ")
    conn.send(server_reply.encode())

    if server_reply.lower() == "bye":
        print("Chat ended by server.")
        break

conn.close()
server_socket.close()