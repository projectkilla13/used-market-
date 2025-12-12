import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  images: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: String,
  category: String,
  archived: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
