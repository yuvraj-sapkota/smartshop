import { z } from "zod";

export const submitPaymentSchema = z.object({
  amount: z.coerce
    .number({ message: "Amount must be a number" })
    .min(1, "Amount must be at least 1"),
  bankName: z.string().min(1, "Bank name is required").trim(),
  accountName: z.string().min(1, "Account name is required").trim(),
  accountNumber: z.string().min(1, "Account number is required").trim(),
  screenshotTime: z.string().min(1, "Screenshot time is required").trim(),
});

export const updatePaymentStatusSchema = z.object({
  status: z.enum(["approved", "rejected"], {
    error: () => ({ message: "Status must be approved or rejected" }),
  }),
  adminNote: z.string().trim().optional(),
});
