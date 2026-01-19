import mongoose from "mongoose";

const CommissionSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  amount: Number,
  paid: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Commission", CommissionSchema);
