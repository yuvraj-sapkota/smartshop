import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    referBy: {
      type: String,
      default: "",
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "seller","admin"],
      default: "user",
    },

    address: {
      type: String,
      default: "",
    },

    storeName: {
      type: String,
      default: "",
    },

    storeAddress: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
