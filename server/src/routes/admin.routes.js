import express from "express";
import auth from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import { getCommissions } from "../controllers/admin.controller.js";

const router = express.Router();
router.get("/commissions", auth, admin, getCommissions);

export default router;
