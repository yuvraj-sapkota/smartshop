import React, { useState } from "react";
import { Menu, User } from "lucide-react";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const UserPageLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 flex flex-col overflow-hidden ">
          {/*  Header */}
          <div className="  bg-white   ">
            <div className="flex items-center justify-between  md:justify-end gap-4  p-4 shadow">
              <button
                onClick={() => setMobileOpen(true)}
                className=" rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out md:hidden"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              <div className="bg-gray-200 h-8 w-8 flex items-center justify-center rounded-full">
                <User size={20} />
              </div>
            </div>
          </div>

          {/* Outlet Content */}
          <div className="flex-1 overflow-y-auto ">
            <div className=" p-4">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserPageLayout;
