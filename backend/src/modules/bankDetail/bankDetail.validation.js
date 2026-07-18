import { z } from "zod";

export const upsertBankDetailSchema = z.object({
  bankName: z.string().min(1, "Bank name is required").trim(),
  fullName: z.string().min(1, "Full name is required").trim(),
  accountNumber: z.string().min(1, "Account number is required").trim(),
});
