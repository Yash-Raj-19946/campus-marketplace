import "./env.js"; // must be first

import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";
import chatSocket from "./sockets/chat.socket.js";

// Debug env
console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS ? "LOADED" : "MISSING");
console.log("CLOUDINARY_KEY:", process.env.CLOUDINARY_KEY ? "LOADED" : "MISSING");

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app"
    ],
    credentials: true
  }
});

chatSocket(io);

// 🔥 THIS IS THE FIX
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
