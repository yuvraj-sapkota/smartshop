import { useState } from "react";

import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight, User, LogOut } from "lucide-react";
import Logo from "../../logo/Logo";

const DesktopSidebar = ({ menuItems, setOpenLogout }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out hidden md:flex flex-col`}
      >
        {/* Header */}
        <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between border-r ">
          {isOpen && <Logo />}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors h-12"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                {isOpen && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default DesktopSidebar;
