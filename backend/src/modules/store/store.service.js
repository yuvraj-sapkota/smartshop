// store ra product group gareko

import User from "../auth/auth.model.js";
import Product from "../product/product.model.js";

/* =========================
   GET STORES WITH PRODUCTS
========================= */
export const getStoresWithProductsService = async () => {
  // 1. Get all approved sellers only (fast indexed query)
  const approvedSellers = await User.find(
    {
      role: "seller",
      sellerStatus: "approved",
    },
    { _id: 1, storeName: 1, storeAddress: 1 },
  );

  const sellerIds = approvedSellers.map((s) => s._id);

  if (!sellerIds.length) {
    return [];
  }

  // 2. Get approved products only from those sellers
  const products = await Product.find({
    status: "approved",
    seller: { $in: sellerIds },
  })
    .select("name price commission measure seller createdAt")
    .sort({ createdAt: -1 })
    .lean();

  // 3. Group products by seller (in memory - fast for read APIs)
  const storeMap = new Map();

  // initialize stores
  approvedSellers.forEach((seller) => {
    storeMap.set(String(seller._id), {
      sellerId: seller._id,
      storeName: seller.storeName,
      storeAddress: seller.storeAddress,
      productCount: 0,
      products: [],
    });
  });

  // assign products to stores
  products.forEach((product) => {
    const key = String(product.seller);

    if (storeMap.has(key)) {
      const store = storeMap.get(key);

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

  // 4. convert map → array
  return Array.from(storeMap.values());
};
