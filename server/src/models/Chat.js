import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔥 OPTIONAL product context (NOT REQUIRED)
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    // per-user custom names
    customNames: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);
