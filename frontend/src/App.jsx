import React from "react";
import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage";
import Dashboard from "./features/userPage/dashboard/Dashboard";
import Purchases from "./features/userPage/purchases/Purchases";
import Reward from "./features/userPage/reward/Reward";
import Fund from "./features/userPage/fund/Fund";
import AffiliatedUser from "./features/userPage/affiliatedUser/AffiliatedUser";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/user" element={<UserPage />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="reward" element={<Reward />} />
            <Route path="fund" element={<Fund />} />
            <Route path="affiliateduser" element={<AffiliatedUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
