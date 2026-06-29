import UserBankDetail from "./userbankdetail.model.js";

export const upsertBankDetailService = async (userId, data, qrUrl) => {
  const { bankName, fullName, accountNumber } = data;

  const updated = await UserBankDetail.findOneAndUpdate(
    { user: userId },
    {
      bankName,
      fullName,
      accountNumber,
      // Only overwrite qrUrl if a new file was uploaded
      ...(qrUrl && { qrUrl }),
    },
    { new: true, upsert: true, runValidators: true },
  );

  return updated;
};

export const getMyBankDetailService = async (userId) => {
  return UserBankDetail.findOne({ user: userId });
};
