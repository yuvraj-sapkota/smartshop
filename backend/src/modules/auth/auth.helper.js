import User from "./auth.model.js";

export const checkEmailExists = async (email) => {
  return await User.findOne({ email });
};

export const checkUsernameExists = async (username) => {
  return await User.findOne({ username });
};
