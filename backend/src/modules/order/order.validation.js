import { z } from "zod";

export const createOrderSchema = z.object({
  customer: z.string().min(1, "Customer name is required"),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required"),
        qty: z.number().int().min(1, "Quantity must be at least 1"),
      }),
    )
    .min(1, "At least one item is required")
    .refine(
      (items) => new Set(items.map((i) => i.productId)).size === items.length,
      { message: "Duplicate products found" },
    ),
});
