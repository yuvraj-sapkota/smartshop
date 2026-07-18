import {
  getRewardConfigService,
  updateRewardConfigService,
} from "./rewardConfig.service.js";

export const getRewardConfig = async (req, res, next) => {
  try {
    const config = await getRewardConfigService();
    res.status(200).json({ success: true, config });
  } catch (error) {
    next(error);
  }
};

export const updateRewardConfig = async (req, res, next) => {
  try {
    const config = await updateRewardConfigService(req.body);
    res.status(200).json({
      success: true,
      message: "Reward ratios updated successfully",
      config,
    });
  } catch (error) {
    next(error);
  }
};
