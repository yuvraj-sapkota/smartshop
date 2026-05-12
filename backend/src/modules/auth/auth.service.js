import bcrypt from "bcryptjs";
import User from "./auth.model.js";
import generateToken from "../../utils/generateToken.js";

export const createUserService = async (data) => {

  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new Error("Email already exists");
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
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("Email already exists");
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
    throw new Error("Invalid credentials");
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  return {
    token,
    user,
  };
};
