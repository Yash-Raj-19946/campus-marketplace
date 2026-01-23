import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addToWishlist,
  getWishlist,
} from "../controllers/wishlist.controller.js";
import { removeFromWishlist } from "../controllers/wishlist.controller.js";

const router = express.Router();

// POST → add product
router.post("/", authMiddleware, addToWishlist);

// GET → fetch wishlist
router.get("/", authMiddleware, getWishlist);

router.delete("/:productId", authMiddleware, removeFromWishlist);


export default router;
