import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  level: String,
  message: String,
  meta: mongoose.Schema.Types.Mixed
}, { timestamps: true });

export default mongoose.models.Log || mongoose.model("Log", LogSchema);
