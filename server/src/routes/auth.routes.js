import express from "express";
import {
  register,
  login,
  verifyEmail,
  getMe,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);

// Protected
router.get("/me", authMiddleware, getMe);

export default router;
