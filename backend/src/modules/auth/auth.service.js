import bcrypt from "bcryptjs";
import User from "./auth.model.js";
import generateToken from "../../utils/generateToken.js";
import AppError from "../../utils/AppError.js";
import {
  checkEmailExists,
  checkUsernameExists,
  getReferrerId,
} from "./auth.helper.js";

export const createUserService = async (data) => {
  const emailExists = await checkEmailExists(data.email);
  if (emailExists) {
    throw new AppError("Email already exists", 400);
  }

  const usernameExists = await checkUsernameExists(data.username);
  if (usernameExists) {
    throw new AppError("username exists", 400);
  }

  // Referral validation
  const referredBy = await getReferrerId(data.referBy);

  // hashed password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const { referBy, ...userData } = data;

  const user = await User.create({
    ...userData,
    password: hashedPassword,
    role: "user",
    referredBy,
  });

  const token = generateToken(user._id);

  return {
    token,
    user,
  };
};

export const createSellerService = async (data) => {
  const emailExists = await checkEmailExists(data.email);
  if (emailExists) {
    throw new AppError("Email already exists", 400);
  }

  const usernameExists = await checkUsernameExists(data.username);
  if (usernameExists) {
    throw new AppError("Username already exists", 400);
  }

  const referredBy = await getReferrerId(data.referBy);


  const hashedPassword = await bcrypt.hash(data.password, 10);

  const { referBy, ...sellerData } = data;

  const seller = await User.create({
    ...sellerData,
    password: hashedPassword,
    role: "seller",
  });

  const token = generateToken(seller._id);
  return {
    token,
    user: seller,
  };
};

export const loginService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid credentials", 400);
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new AppError("Invalid credentials", 400);
  }

  const token = generateToken(user._id);

  return {
    token,
    user,
  };
};
