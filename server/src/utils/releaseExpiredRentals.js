import Product from "../models/Product.js";

export const releaseExpiredRentals = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // midnight today

  await Product.updateMany(
    {
      status: "RENTED",
      rentTo: { $lt: today },
    },
    {
      $set: {
        status: "AVAILABLE",
        rentFrom: null,
        rentTo: null,
        currentRenter: null,
      },
    }
  );
};
