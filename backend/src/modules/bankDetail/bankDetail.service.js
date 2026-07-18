import BankDetail from "./bankDetail.model.js";

export const upsertBankDetailService = async (userId, data, qrUrl) => {
  const { bankName, fullName, accountNumber } = data;

  return BankDetail.findOneAndUpdate(
    { user: userId },
    {
      bankName,
      fullName,
      accountNumber,
      ...(qrUrl && { qrUrl }),
    },
    { new: true, upsert: true, runValidators: true },
  );
};

export const getMyBankDetailService = async (userId) => {
  return BankDetail.findOne({ user: userId });
};
