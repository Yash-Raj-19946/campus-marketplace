import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  createRequest,
  cancelRequestByBuyer,
  getSellerRequests,
  confirmRequest,
  cancelRequestBySeller,
} from "../controllers/request.controller.js";
import { getMyHistory } from "../controllers/request.controller.js";

const router = express.Router();

/**
 * BUY / RENT REQUEST (Buyer confirms)
 * POST /api/requests/:productId
 */
router.post("/:productId", auth, createRequest);

/**
 * BUYER CANCEL REQUEST
 * PATCH /api/requests/:id/cancel
 */
router.patch("/:id/cancel", auth, cancelRequestByBuyer);

/**
 * SELLER GET ALL REQUESTS
 * GET /api/requests/seller
 */
router.get("/seller", auth, getSellerRequests);
router.get("/my-history", auth, getMyHistory);
/**
 * SELLER CONFIRM REQUEST
 * PATCH /api/requests/:id/confirm
 */
router.patch("/:id/confirm", auth, confirmRequest);

/**
 * SELLER CANCEL REQUEST
 * PATCH /api/requests/:id/seller-cancel
 */
router.patch("/:id/seller-cancel", auth, cancelRequestBySeller);

export default router;
