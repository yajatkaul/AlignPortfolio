import mongoose from "mongoose";

//Schema
const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      minlength: 5,
    },
    number: {
      type: String,
      required: true,
      unique: true,
    },
    type: { type: String, required: true },
    location: { type: String, required: true },
    role: {
      type: String,
      default: "Member",
      enum: ["Member", "Employee", "Admin"],
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
