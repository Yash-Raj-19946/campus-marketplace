import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import messageRoutes from "./routes/message.routes.js";
import requestRoutes from "./routes/request.routes.js";

const app = express();

/* ================= CORS ================= */
/* ================= CORS ================= */
app.use(
  cors({
    origin: [
      "https://campus-marketplace-api.onrender.com/api:5173",
      "https://campus-marketplace-one.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: allow preflight requests
app.options("*", cors());

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {
  res.send("Campus Marketplace API is running 🚀");
});

export default app;
