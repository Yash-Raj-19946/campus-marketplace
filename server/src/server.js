import "./env.js"; // 🔥 MUST be first import

import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";
import { initMailer } from "./config/mail.js";
import chatSocket from "./sockets/chat.socket.js";

// Debug env
console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS ? "LOADED" : "MISSING");
console.log("CLOUDINARY_KEY:", process.env.CLOUDINARY_KEY ? "LOADED" : "MISSING");

connectDB();
initMailer();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

chatSocket(io);

server.listen(5000, () =>
  console.log("Server running on port 5000")
);
