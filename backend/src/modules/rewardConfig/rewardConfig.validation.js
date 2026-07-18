import { z } from "zod";

export const updateRewardConfigSchema = z.object({
  cashbackRate: z
    .number()
    .min(0, "Must be 0 or greater")
    .max(1, "Must be 100% or less"),
  userReferralRate: z.number().min(0).max(1),
  sellerReferralRate: z.number().min(0).max(1),
});
