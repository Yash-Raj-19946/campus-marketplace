import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getChats,
  accessChat,
  renameChat,   // ✅ IMPORT ADDED
} from "../controllers/chat.controller.js";

const router = express.Router();

// GET MY CHATS
router.get("/", auth, getChats);

// CREATE / ACCESS CHAT
router.post("/access", auth, accessChat);

// RENAME CHAT (per user)
router.patch("/:chatId/rename", auth, renameChat);

export default router;
