import {
  getMyBankDetailService,
  upsertBankDetailService,
} from "./userbankdetail.service.js";

export const upsertBankDetail = async (req, res, next) => {
  try {
    // req.file is optional — user may update text fields without re-uploading QR
    const qrUrl = req.file?.path ?? null;

    const bankDetail = await upsertBankDetailService(
      req.user._id,
      req.body,
      qrUrl,
    );

    res.status(200).json({
      success: true,
      message: "Bank details saved successfully",
      bankDetail,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getMyBankDetail = async (req, res, next) => {
  try {
    const bankDetail = await getMyBankDetailService(req.user._id);
    res.status(200).json({ success: true, bankDetail: bankDetail ?? null });
  } catch (error) {
    next(error);
  }
};
