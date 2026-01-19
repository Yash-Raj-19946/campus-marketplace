import Request from "../models/Request.js";
import Product from "../models/Product.js";

/**
 * BUY / RENT REQUEST (Buyer)
 */
export const createRequest = async (req, res) => {
  const { productId } = req.params;
  const { rentFrom, rentTo, totalDays, totalPrice } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ msg: "Product not found" });

  if (product.status === "SOLD" || product.status === "RENTED") {
    return res.status(400).json({ msg: "Product not available" });
  }

  if (product.owner.equals(req.user._id)) {
    return res.status(400).json({ msg: "Cannot request your own product" });
  }

  const requestData = {
    product: product._id,
    buyer: req.user._id,
    seller: product.owner,
    type: product.type,
  };

  // 🔥 STORE RENT DETAILS
  if (product.type === "rent") {
    requestData.rentFrom = rentFrom;
    requestData.rentTo = rentTo;
    requestData.totalDays = totalDays;
    requestData.totalPrice = totalPrice;
  }

  const request = await Request.create(requestData);

  product.status = "IN_NEGOTIATION";
  await product.save();

  res.status(201).json(request);
};

/**
 * BUYER CANCEL REQUEST
 */
export const cancelRequestByBuyer = async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) return res.status(404).json({ msg: "Request not found" });

  if (!request.buyer.equals(req.user._id)) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  request.status = "CANCELLED";
  await request.save();

  await Product.findByIdAndUpdate(request.product, {
    status: "AVAILABLE",
  });

  res.json({ msg: "Request cancelled" });
};

/**
 * SELLER GET ALL REQUESTS
 */
export const getSellerRequests = async (req, res) => {
  const requests = await Request.find({
    seller: req.user._id,
    status: "PENDING",
  })
    .populate("product")
    .populate("buyer", "email");

  res.json(requests);
};

/**
 * SELLER CONFIRM REQUEST
 */
export const confirmRequest = async (req, res) => {
  const request = await Request.findById(req.params.id).populate("product");
  if (!request) return res.status(404).json({ msg: "Request not found" });

  if (!request.seller.equals(req.user._id)) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  request.status = "CONFIRMED";
  await request.save();

  if (request.type === "rent") {
    request.product.status = "RENTED";
    request.product.rentFrom = request.rentFrom;
    request.product.rentTo = request.rentTo;
    request.product.currentRenter = request.buyer;
  } else {
    request.product.status = "SOLD";
  }

  await request.product.save();

  res.json({ msg: "Deal confirmed" });
};

/**
 * SELLER CANCEL REQUEST
 */
export const cancelRequestBySeller = async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) return res.status(404).json({ msg: "Request not found" });

  if (!request.seller.equals(req.user._id)) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  request.status = "CANCELLED";
  await request.save();

  await Product.findByIdAndUpdate(request.product, {
    status: "AVAILABLE",
  });

  res.json({ msg: "Request cancelled" });
};
/**
 * BUYER PURCHASE / RENT HISTORY
 */
export const getMyHistory = async (req, res) => {
  const history = await Request.find({
    buyer: req.user._id,
    status: "CONFIRMED",
  })
    .populate("product")
    .sort({ createdAt: -1 });

  res.json(history);
};
