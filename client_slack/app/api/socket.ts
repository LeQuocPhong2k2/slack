import { Server } from "socket.io";

export default function SocketHandler(req:any, res:any) {
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("Socket connected: ", socket.id);
    socket.on("send-message", (obj) => {
      io.emit("receive-message", obj);  
    });
    });
    console.log("Socket.io handler added");
    res.end();
}