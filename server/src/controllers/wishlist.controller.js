import Wishlist from "../models/Wishlist.js";

/**
 * ADD TO WISHLIST
 */
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    let wishlist = await Wishlist.findOne({ user: userId });

    // create wishlist if not exists
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        products: [],
      });
    }

    // already in wishlist
    if (wishlist.products.includes(productId)) {
      return res.status(400).json({
        msg: "Already in wishlist",
      });
    }

    wishlist.products.push(productId);
    await wishlist.save();

    res.json({ msg: "Added to wishlist 🤍" });
  } catch (err) {
    console.error("ADD WISHLIST ERROR:", err);
    res.status(500).json({ msg: "Failed to add to wishlist" });
  }
};

/**
 * GET WISHLIST
 */
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.user._id,
    }).populate("products");

    res.json(wishlist ? wishlist.products : []);
  } catch (err) {
    console.error("GET WISHLIST ERROR:", err);
    res.status(500).json({ msg: "Failed to load wishlist" });
  }
};
