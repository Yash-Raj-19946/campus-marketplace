import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },

    type: {
      type: String,
      enum: ["buy", "rent"],
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    // 🔥 STATUS SYSTEM
    status: {
      type: String,
      enum: ["AVAILABLE", "IN_NEGOTIATION", "SOLD", "RENTED"],
      default: "AVAILABLE",
    },

    currentRenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },


    // 🔥 RENT PERIOD (ONLY FOR RENT)
    rentFrom: Date,
    rentTo: Date,
  },
  { timestamps: true }
);

ProductSchema.index({ title: "text", description: "text" });

export default mongoose.model("Product", ProductSchema);
