import { getMyReferralsService } from "./referal.service.js";

export const getMyReferrals = async (req, res, next) => {
  try {
    const referrals = await getMyReferralsService(req.user.id);

    res.status(200).json({
      success: true,
      message: "Referral list fetched successfully",
      total: referrals.length,
      referrals,
    });
  } catch (error) {
    next(error);
  }
};