import { z } from "zod";

export const updateWithdrawalStatusSchema = z.object({
  status: z.enum(["approved", "rejected"], {
    message: "Status must be approved or rejected",
  }),
  adminNote: z.string().trim().optional(),
});