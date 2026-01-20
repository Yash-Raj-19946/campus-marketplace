import express from "express";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js";
import {
  createProduct,
  searchProducts,
  getMyProducts,
  takeDownProduct,
} from "../controllers/product.controller.js";
import Product from "../models/Product.js";
import { releaseExpiredRentals } from "../utils/releaseExpiredRentals.js";



const router = express.Router();

/**
 * CREATE PRODUCT (with image)
 */
router.post("/", auth, upload.single("image"), createProduct);

/**
 * GET LOGGED-IN USER PRODUCTS (Dashboard)
 */
router.get("/my", auth, getMyProducts);

router.get("/rent", auth, async (req, res) => {
  await releaseExpiredRentals(); // 🔥 AUTO RELEASE

  const products = await Product.find({
    type: "rent",
    owner: { $ne: req.user.id },
  });

  res.json(products);
});

/**
 * GET BUY PRODUCTS (ONLY AVAILABLE, EXCLUDE MY PRODUCTS)
 */
router.get("/buy", auth, async (req, res) => {
  try {
    const search = req.query.search || "";

    const products = await Product.find({
      type: "buy",
      status: "AVAILABLE", // ✅ FIX
      owner: { $ne: req.user.id },
      ...(search && {
        title: { $regex: search, $options: "i" },
      }),
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.error("GET BUY PRODUCTS ERROR:", err);
    res.status(500).json({ msg: "Failed to load buy products" });
  }
});

/**
 * GET RENT PRODUCTS (ONLY AVAILABLE, EXCLUDE MY PRODUCTS)
 */
router.get("/rent", auth, async (req, res) => {
  try {
    const search = req.query.search || "";

    const products = await Product.find({
      type: "rent",
      owner: { $ne: req.user.id },
      ...(search && {
        title: { $regex: search, $options: "i" },
      }),
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load rent products" });
  }
});


/**
 * SEARCH PRODUCTS (legacy / optional)
 */
router.get("/search", searchProducts);

/**
 * TAKE DOWN PRODUCT (Owner only)
 */
router.patch("/:id/take-down", auth, takeDownProduct);

export default router;
