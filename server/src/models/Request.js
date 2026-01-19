import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["buy", "rent"],
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },

    // 🔥 RENT DETAILS (ONLY FOR RENT)
    rentFrom: Date,
    rentTo: Date,
    totalDays: Number,
    totalPrice: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Request", RequestSchema);
