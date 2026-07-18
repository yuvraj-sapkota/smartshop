import {
  getMyBankDetailService,
  upsertBankDetailService,
} from "./bankDetail.service.js";

export const upsertBankDetail = async (req, res, next) => {
  try {
    const qrUrl = req.file?.path ?? null;
    const userId = req.user.role === "admin" ? null : req.user._id;

    const bankDetail = await upsertBankDetailService(userId, req.body, qrUrl);

    res.status(200).json({
      success: true,
      message: "Bank details saved successfully",
      bankDetail,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyBankDetail = async (req, res, next) => {
  try {
    const userId = req.user.role === "admin" ? null : req.user._id;
    const bankDetail = await getMyBankDetailService(userId);
    res.status(200).json({ success: true, bankDetail: bankDetail ?? null });
  } catch (error) {
    next(error);
  }
};

// admin viewing a specific OTHER user's bank detail — unchanged behavior
export const getUserBankDetail = async (req, res, next) => {
  try {
    const bankDetail = await getMyBankDetailService(req.params.userId);
    res.status(200).json({ success: true, bankDetail: bankDetail ?? null });
  } catch (error) {
    next(error);
  }
};

// admin ko bank details seller ko fund page ma dekhauna
export const getAdminBankDetail = async (req, res, next) => {
  try {
    const bankDetail = await getMyBankDetailService(null);
    res.status(200).json({ success: true, bankDetail: bankDetail ?? null });
  } catch (error) {
    next(error);
  }
};
