import User from "../auth/auth.model.js";

export const getCustomersService = async () => {
  const customers = await User.find({ role: "user" }).select(
    "_id username email"
  );
  return customers;
};