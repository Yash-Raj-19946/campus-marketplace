import mongoose from "mongoose";

const RentalSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startDate: Date,
  endDate: Date,
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Rental", RentalSchema);
