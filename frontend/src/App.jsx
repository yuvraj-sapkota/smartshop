import React from "react";
import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./features/userPage/dashboard/Dashboard";
import Purchases from "./features/userPage/purchases/Purchases";
import Reward from "./features/userPage/reward/Reward";
import Fund from "./features/userPage/fund/Fund";
import AffiliatedUser from "./features/userPage/affiliatedUser/AffiliatedUser";
import ShopNow from "./features/userPage/shopNow/ShopNow";
import SellerDashboard from "./features/sellerPage/sellerDashboard/SellerDashboard";
import CreateOrder from "./features/sellerPage/createOrder/CreateOrder";
import Product from "./features/sellerPage/product/Product";
import SellerFund from "./features/sellerPage/sellerFund/SellerFund";
import Sales from "./features/sellerPage/sales/Sales";
import Commission from "./features/sellerPage/commission/Commission";
import AppLayout from "./layouts/AppLayout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* user routes  */}

          <Route path="/user" element={<AppLayout />}>
            <Route index element={<Navigate to="shop" />} />
            <Route path="shop" element={<ShopNow />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="reward" element={<Reward />} />
            <Route path="fund" element={<Fund />} />
            <Route path="affiliateduser" element={<AffiliatedUser />} />
          </Route>

          <Route path="/seller" element={<AppLayout />}>
            <Route index element={<Navigate to="seller-dashboard" />} />
            <Route path="seller-dashboard" element={<SellerDashboard />} />
            <Route path="create-order" element={<CreateOrder />} />
            <Route path="product" element={<Product />} />
            <Route path="sales" element={<Sales />} />
            <Route path="commission" element={<Commission />} />
            <Route path="seller-fund" element={<SellerFund />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
