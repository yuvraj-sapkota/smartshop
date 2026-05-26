// store ra product group gareko

import User from "../auth/auth.model.js";
import Product from "../product/product.model.js";

/* =========================
   GET STORES WITH PRODUCTS
========================= */
export const getStoresWithProductsService = async () => {
  // 1. Get approved products first
  const products = await Product.find({ status: "approved" })
    .select("name price commission measure seller createdAt")
    .sort({ createdAt: -1 })
    .lean();

  if (!products.length) {
    return [];
  }

  // 2. Unique sellerIds product bata nikalne (products bhako sellers matra)
  const sellerIdsWithProducts = [...new Set(products.map((p) => String(p.seller)))];

  // 3. Tini sellers matra fetch garne
  const approvedSellers = await User.find(
    {
      _id: { $in: sellerIdsWithProducts },
      role: "seller",
      sellerStatus: "approved",
    },
    { _id: 1, storeName: 1, storeAddress: 1 },
  ).lean();

  if (!approvedSellers.length) {
    return [];
  }

  // 4. Seller lookup map banau
  const sellerMap = new Map();
  approvedSellers.forEach((seller) => {
    sellerMap.set(String(seller._id), {
      sellerId: seller._id,
      storeName: seller.storeName,
      storeAddress: seller.storeAddress,
      productCount: 0,
      products: [],
    });
  });

  // 5. Products assign garne (approved sellers matra)
  products.forEach((product) => {
    const key = String(product.seller);

    if (sellerMap.has(key)) {
      const store = sellerMap.get(key);

      store.products.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        commission: product.commission,
        measure: product.measure,
        createdAt: product.createdAt,
      });

      store.productCount += 1;
    }
  });

  // 6. convert map → array
  return Array.from(sellerMap.values());
};