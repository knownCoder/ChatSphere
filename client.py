import socket

HOST = "127.0.0.1"
PORT = 12345

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

client_socket.connect((HOST, PORT))
print(f"Connected to server at {HOST}:{PORT}")

while True:
    client_message = input("You: ")
    client_socket.send(client_message.encode())

    if client_message.lower() == "bye":
        print("Chat ended by client.")
        break

    server_reply = client_socket.recv(1024).decode()

    if not server_reply:
        print("Server disconnected.")
        break

    print(f"Server: {server_reply}")

    if server_reply.lower() == "bye":
        print("Server ended the chat.")
        break

client_socket.close()