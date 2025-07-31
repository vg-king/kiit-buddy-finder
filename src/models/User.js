import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  adminPassword: { type: String, required: true },
  kitchenPassword: { type: String, required: true }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);