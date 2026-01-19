import Commission from "../models/Commission.js";

export const getCommissions = async (req, res) => {
  const data = await Commission.find().populate("product");
  res.json(data);
};
