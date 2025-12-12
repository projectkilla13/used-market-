import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: false },
  avatarUrl: { type: String, required: false },
  bio: { type: String, required: false },
  location: { type: String, required: false },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  role: { type: String, default: "user" },
  banned: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
