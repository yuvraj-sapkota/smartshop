import { NavLink } from "react-router-dom";
import { User, LogOut, X } from "lucide-react";

import { useState } from "react";
import Logo from "../../logo/Logo";

const MobileSidebar = ({
  mobileOpen,
  menuItems,
  setMobileOpen,
  setOpenLogout,
}) => {

  return (
    <>
      {/* ================= MOBILE SIDEBAR DRAWER ================= */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Drawer */}
        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out ${
            mobileOpen
              ? "translate-x-0  "
              : "-translate-x-full border border-blue-500"
          }`}
        >
          {/* Drawer Header */}
          <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between ">
            <Logo />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Drawer Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="font-medium text-sm">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default MobileSidebar;
