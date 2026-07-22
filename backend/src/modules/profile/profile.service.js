import bcrypt from "bcryptjs";
import User from "../auth/auth.model.js";
import AppError from "../../utils/AppError.js";
import { checkEmailExists, checkUsernameExists } from "../auth/auth.helper.js";

export const getMyProfileService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new AppError("User not found", 404);
  return user;
};

export const updateMyProfileService = async (userId, data, role) => {
  const updateData = {
    username: data.username,
    email: data.email,
    phone: data.phone,
    address: data.address,
  };

  // Only sellers may update store fields, even if a client sends them
  if (role === "seller") {
    updateData.storeName = data.storeName;
    updateData.storeAddress = data.storeAddress;
  }

  // Drop undefined keys so we don't overwrite fields the client didn't send
  Object.keys(updateData).forEach(
    (key) => updateData[key] === undefined && delete updateData[key],
  );

  if (updateData.username) {
    const existing = await checkUsernameExists(updateData.username);
    if (existing && existing._id.toString() !== userId.toString()) {
      throw new AppError("Username already taken", 400);
    }
  }

  if (updateData.email) {
    const existing = await checkEmailExists(updateData.email);
    if (existing && existing._id.toString() !== userId.toString()) {
      throw new AppError("Email already in use", 400);
    }
  }

  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) throw new AppError("User not found", 404);
  return user;
};

export const changePasswordService = async (
  userId,
  currentPassword,
  newPassword,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  const isMatched = await bcrypt.compare(currentPassword, user.password);
  if (!isMatched) throw new AppError("Current password is incorrect", 400);

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};
