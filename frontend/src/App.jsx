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
import RewardRatio from "./features/adminSection/rewardRatio/RewardRatio";
import Login from "./auth/login/Login";
import ChooseRole from "./auth/ChooseRole";
import UserSignup from "./auth/signup/UserSignup";
import SellerSignup from "./auth/signup/SellerSignup";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import SellerDetail from "./features/adminSection/sellers/SellerDetail";
import Profile from "./features/profile/Profile";
import Unauthorized from "./pages/Unauthorized";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <ChooseRole />
              </PublicRoute>
            }
          />
          <Route
            path="/signup/user"
            element={
              <PublicRoute>
                <UserSignup />
              </PublicRoute>
            }
          />
          <Route
            path="/signup/seller"
            element={
              <PublicRoute>
                <SellerSignup />
              </PublicRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* user routes protected  */}

          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="shop" />} />
            <Route path="shop" element={<ShopNow />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="reward" element={<Reward />} />
            <Route path="fund" element={<Fund />} />
            <Route path="affiliated-user" element={<AffiliatedUser />} />
            <Route path="profile" element={<Profile />} />
            {/* <Route path="affiliated-user" element={<AffiliatedUser />} /> */}
          </Route>

          <Route
            path="/seller"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="shop" />} />
            <Route path="shop" element={<ShopNow />} />
            <Route path="seller-dashboard" element={<SellerDashboard />} />
            <Route path="create-order" element={<CreateOrder />} />
            <Route path="products" element={<Product />} />
            <Route path="commission" element={<Commission />} />
            <Route path="seller-fund" element={<SellerFund />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="shop" />} />
            <Route path="shop" element={<ShopNow />} />
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="sales-history" element={<SalesHistory />} />
            <Route path="seller-commission" element={<SellerCommission />} />
            <Route path="user-commission" element={<UserCommission />} />
            <Route path="fund" element={<AdminFund />} />
            <Route path="users" element={<Users />} />
            <Route path="sellers" element={<Sellers />} />
            <Route path="seller-detail/:id" element={<SellerDetail />} />
            <Route path="reward-ratio" element={<RewardRatio />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
