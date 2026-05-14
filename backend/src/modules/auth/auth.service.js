import bcrypt from "bcryptjs";
import User from "./auth.model.js";
import generateToken from "../../utils/generateToken.js";
import AppError from "../../utils/AppError.js";
import { checkEmailExists, checkUsernameExists } from "./auth.helper.js";

export const createUserService = async (data) => {
  const emailExists = await checkEmailExists(data.email);

  const usernameExists = await checkUsernameExists(data.username);

  if (emailExists) {
    throw new AppError("Email already exists", 400);
  }

  if (usernameExists) {
    throw new AppError("username exists", 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
    role: "user",
  });

  const token = generateToken(user._id);

  return {
    token,
    user,
  };
};

export const createSellerService = async (data) => {
  const emailExists = await checkEmailExists(data.email);

  const usernameExists = await checkUsernameExists(data.username);

  if (emailExists) {
    throw new AppError("Email already exists", 400);
  }
  if (usernameExists) {
    throw new AppError("Username already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const seller = await User.create({
    ...data,
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
