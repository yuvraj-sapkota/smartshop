import User from "../auth/auth.model.js";

export const getMyReferralsService = async (userId) => {
  const referrals = await User.find({ referredBy: userId })
    .select("-password")
    .sort({ createdAt: -1 });

  return referrals;
};