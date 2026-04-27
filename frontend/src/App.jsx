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
import AdminDashboard from "./features/adminSection/adminDashboard/AdminDashboard";
import AdminProducts from "./features/adminSection/products/AdminProducts";
import SalesHistory from "./features/adminSection/salesHistory/SalesHistory";
import SellerCommission from "./features/adminSection/sellerCommission/SellerCommission";
import UserCommission from "./features/adminSection/userCommission/UserCommission";
import AdminFund from "./features/adminSection/adminFund/AdminFund";
import Users from "./features/adminSection/users/Users";
import Sellers from "./features/adminSection/sellers/Sellers";
import RewardRation from "./features/adminSection/rewardRatio/RewardRation";

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
            <Route path="affiliated-user" element={<AffiliatedUser />} />
          </Route>

          <Route path="/seller" element={<AppLayout />}>
            <Route index element={<Navigate to="seller-dashboard" />} />
            <Route path="seller-dashboard" element={<SellerDashboard />} />
            <Route path="create-order" element={<CreateOrder />} />
            <Route path="products" element={<Product />} />
            <Route path="sales" element={<Sales />} />
            <Route path="commission" element={<Commission />} />
            <Route path="seller-fund" element={<SellerFund />} />
          </Route>

          {/* admin routes */}
          <Route path="/admin" element={<AppLayout />}>
            <Route index element={<Navigate to="admin-dashboard" />} />

            <Route path="admin-dashboard" element={<AdminDashboard />} />

            <Route path="products" element={<AdminProducts />} />

            <Route path="sales-history" element={<SalesHistory />} />

            <Route path="seller-commission" element={<SellerCommission />} />

            <Route path="user-commission" element={<UserCommission />} />

            <Route path="fund" element={<AdminFund />} />

            <Route path="users" element={<Users />} />

            <Route path="sellers" element={<Sellers />} />

            <Route path="reward-ratio" element={<RewardRation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
