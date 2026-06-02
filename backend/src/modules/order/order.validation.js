import { z } from "zod";

const orderItemSchema = z
  .object({
    productId: z.string().optional(),
    productName: z.string().optional(),
    qty: z.number().int().min(1, "Quantity must be at least 1"),
    price: z.number().optional(),
  })
  .refine(
    (item) => item.productId || item.productName,
    { message: "Either productId or productName is required" }
  )
  .refine(
    (item) => {
      // Custom product — price is required (no DB to resolve from)
      if (!item.productId) return item.price !== undefined && item.price >= 0;
      return true;
    },
    { message: "Price is required for custom products" }
  );

export const createOrderSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  items: z
    .array(orderItemSchema)
    .min(1, "At least one item is required")
    .refine(
      (items) => {
        // Duplicate check — only among registered products
        const registeredIds = items
          .filter((i) => i.productId)
          .map((i) => i.productId);
        return new Set(registeredIds).size === registeredIds.length;
      },
      { message: "Duplicate registered products found" }
    ),
});