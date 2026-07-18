import RewardConfig from "./rewardConfig.model.js";

// Same rates you've had hardcoded everywhere — used only until an admin saves a config
const DEFAULTS = {
  cashbackRate: 0.25,
  userReferralRate: 0.1,
  sellerReferralRate: 0.1,
};

// Singleton — one document total, same pattern as bankDetail's admin record
export const getRewardConfigService = async () => {
  const config = await RewardConfig.findOne({});
  return config ?? DEFAULTS;
};

export const updateRewardConfigService = async (data) => {
  const { cashbackRate, userReferralRate, sellerReferralRate } = data;

  return RewardConfig.findOneAndUpdate(
    {},
    { cashbackRate, userReferralRate, sellerReferralRate },
    { new: true, upsert: true, runValidators: true },
  );
};
