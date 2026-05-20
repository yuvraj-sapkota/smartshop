import { z } from "zod";

export const updateSellerStatusSchema = z.object({
  sellerStatus: z.enum(["approved", "rejected"]),
});

export const updateProductStatusSchema = z.object({
  status: z.enum(["approved", "rejected"]),
});
