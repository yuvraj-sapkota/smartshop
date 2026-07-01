import AppError from "../../utils/AppError.js";
import User from "./auth.model.js";

export const checkEmailExists = async (email) => {
  return await User.findOne({ email });
};

export const checkUsernameExists = async (username) => {
  return await User.findOne({ username });
};

export const getReferrerId = async (referBy) => {
  if (!referBy || referBy.trim() === "") {
    return null;
  }
  // Currently username acts as referral code
  const referrer = await User.findOne({
    username: referBy.trim(),
  }).select("_id");

  if (!referrer) {
    throw new AppError("Invalid referral code", 400);
  }

  return referrer._id;
};
