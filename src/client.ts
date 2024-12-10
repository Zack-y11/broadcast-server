import io from "socket.io-client";
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to server");
  socket.emit("message", "Hello from client");

  socket.on("message", (msg) => {
    console.log(msg);
  });
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});