import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Calendar,
  QrCode,
  Settings,
  Menu,
  X,
  ShoppingBag,
  Gift,
  Wallet,
  Users,
  ShoppingBasket,
} from "lucide-react";
import MobileSidebar from "./sidebarComponents/MobileSidebar";
import DesktopSidebar from "./sidebarComponents/DesktopSidebar";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const [openLogout, setOpenLogout] = useState(false);

  const menuItems = [
    { path: "shop", label: "Shop Now", icon: ShoppingBag },
    { path: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "purchases", label: "Purchases", icon: ShoppingBasket },
    { path: "reward", label: "Reward", icon: Gift },
    { path: "fund", label: "Fund", icon: Wallet },
    { path: "affiliateduser", label: "Affiliate user", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <MobileSidebar
        menuItems={menuItems}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setOpenLogout={setOpenLogout}
      />

      <DesktopSidebar menuItems={menuItems} setOpenLogout={setOpenLogout} />

      {/* {openLogout && <ConfirmLogout onCancel={() => setOpenLogout(false)} />} */}
    </div>
  );
}
