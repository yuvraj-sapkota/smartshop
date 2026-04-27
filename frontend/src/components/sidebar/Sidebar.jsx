import { useState } from "react";

import { Outlet } from "react-router-dom";

import MobileSidebar from "./sidebarComponents/MobileSidebar";
import DesktopSidebar from "./sidebarComponents/DesktopSidebar";
import { menuConfig } from "../../config/menuConfig";

export default function Sidebar({ mobileOpen, setMobileOpen, role }) {
  const [openLogout, setOpenLogout] = useState(false);

  const menuItems = menuConfig[role] || [];
  console.log(menuItems);

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
