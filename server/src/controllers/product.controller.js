import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

/**
 * CREATE PRODUCT
 */
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, type } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "Image required" });
    }

    const upload = await cloudinary.uploader.upload(
      `data:image/png;base64,${req.file.buffer.toString("base64")}`
    );

    const product = await Product.create({
      title,
      description,
      price,
      type,
      image: upload.secure_url,
      owner: req.user._id,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ msg: "Create failed" });
  }
};

/**
 * GET MY PRODUCTS (SELLER DASHBOARD)
 * 🔥 FIX: populate currentRenter
 */
export const getMyProducts = async (req, res) => {
  const products = await Product.find({ owner: req.user._id })
    .populate("currentRenter", "_id email"); // 🔥 REQUIRED

  res.json(products);
};


/**
 * SEARCH PRODUCTS
 */
export const searchProducts = async (req, res) => {
  const q = req.query.q || "";
  const products = await Product.find({
    $text: { $search: q },
    status: "AVAILABLE",
  });
  res.json(products);
};

/**
 * COMPLETE PRODUCT (SOLD / RENTED)
 */
export const completeProduct = async (req, res) => {
  const { productId } = req.params;
  const { rentFrom, rentTo } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ msg: "Not found" });

  if (!product.owner.equals(req.user._id)) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  if (product.type === "rent") {
    if (!rentFrom || !rentTo) {
      return res.status(400).json({ msg: "Rent dates required" });
    }

    product.status = "RENTED";
    product.rentFrom = rentFrom;
    product.rentTo = rentTo;
    // ⚠️ currentRenter is set in request confirmation, not here
  } else {
    product.status = "SOLD";
  }

  await product.save();
  res.json(product);
};

/**
 * TAKE DOWN (ONLY IF AVAILABLE)
 */
export const takeDownProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ msg: "Not found" });

  if (product.status !== "AVAILABLE") {
    return res
      .status(400)
      .json({ msg: "Cannot take down during negotiation" });
  }

  product.status = "SOLD";
  await product.save();

  res.json({ msg: "Taken down" });
};
