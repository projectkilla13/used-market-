const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Message = require("./src/models/Message").default;
const User = require("./src/models/User").default;

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);

  socket.on("join", (room) => {
    socket.join(room);
  });

  socket.on("message", async (data) => {
    try {
      const msg = await Message.create({ from: data.from, to: data.to, text: data.text });
      io.to(data.to).emit("message", msg);
      io.to(data.from).emit("message", msg);
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected:", socket.id);
  });
});

const PORT = process.env.SOCKET_PORT || 4000;

mongoose.connect(process.env.MONGODB_URI, {}).then(() => {
  console.log("Socket server connected to MongoDB");
  server.listen(PORT, () => console.log("Socket server listening on", PORT));
}).catch(err => console.error(err));
