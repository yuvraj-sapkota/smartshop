// store ra product group gareko

import mongoose from "mongoose";
import User from "../auth/auth.model.js";
import Product from "../product/product.model.js";

/* =========================
   GET STORES WITH PRODUCTS
   Optionally sorted by distance from { lat, lng }
========================= */
export const getStoresWithProductsService = async ({ lat, lng } = {}) => {
  // 1. Get approved products first
  const products = await Product.find({ status: "approved" })
    .select("name price commission measure seller createdAt")
    .sort({ createdAt: -1 })
    .lean();

  if (!products.length) {
    return [];
  }

  // 2. Unique sellerIds product bata nikalne (products bhako sellers matra)
  const sellerIdsWithProducts = [
    ...new Set(products.map((p) => String(p.seller))),
  ];

  const hasLocation = lat != null && lng != null;
  let approvedSellers;

  if (hasLocation) {
    // Sellers with saved coordinates, sorted nearest → farthest
    const nearbySellers = await User.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lng, lat] },
          distanceField: "distance", // meters
          spherical: true,
          query: {
            _id: {
              $in: sellerIdsWithProducts.map(
                (id) => new mongoose.Types.ObjectId(id),
              ),
            },
            role: "seller",
            sellerStatus: "approved",
          },
        },
      },
      { $project: { storeName: 1, storeAddress: 1, distance: 1, phone: 1 } },
    ]);

    // Sellers with products but no saved coordinates — appended after, unsorted
    const nearbyIds = new Set(nearbySellers.map((s) => String(s._id)));
    const remainingSellers = await User.find(
      {
        _id: {
          $in: sellerIdsWithProducts.filter((id) => !nearbyIds.has(id)),
        },
        role: "seller",
        sellerStatus: "approved",
      },
      { _id: 1, storeName: 1, storeAddress: 1, phone: 1 },
    ).lean();

    approvedSellers = [...nearbySellers, ...remainingSellers];
  } else {
    approvedSellers = await User.find(
      {
        _id: { $in: sellerIdsWithProducts },
        role: "seller",
        sellerStatus: "approved",
      },
      { _id: 1, storeName: 1, storeAddress: 1, phone: 1 },
    ).lean();
  }

  if (!approvedSellers.length) {
    return [];
  }

  // 3. Seller lookup map banau (insertion order = nearest-first order already)
  const sellerMap = new Map();
  approvedSellers.forEach((seller) => {
    sellerMap.set(String(seller._id), {
      sellerId: seller._id,
      storeName: seller.storeName,
      storeAddress: seller.storeAddress,
      phone: seller.phone,
      distance: seller.distance ?? null, // meters, null if unknown
      productCount: 0,
      products: [],
    });
  });

  // 4. Products assign garne (approved sellers matra)
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

  // 5. convert map → array (Map preserves insertion order = nearest-first)
  return Array.from(sellerMap.values());
};