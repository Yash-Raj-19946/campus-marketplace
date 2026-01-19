import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

// GET all messages of a chat
router.get("/:chatId", auth, getMessages);

// SEND a message to a chat
router.post("/:chatId", auth, sendMessage);

export default router;
