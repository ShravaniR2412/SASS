import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    ownerName: { type: String, required: true },
    salonName: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true }, // Ensure location is included
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
