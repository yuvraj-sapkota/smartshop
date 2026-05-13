import React, { useEffect, useState } from "react";
import { LogOut, Menu, User } from "lucide-react";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth/authStore";
import { useRef } from "react";
import ConfirmModal from "../components/ConfirmModal";

const AppLayout = () => {
  const { user, logout } = useAuthStore();

  const role = user?.role;
  const navigate = useNavigate();

  const dropdownRef = useRef();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  // const [isOpen, setIsOpen] = useState(true);

  // const role = localStorage.getItem("role");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          role={role}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 flex flex-col overflow-hidden ">
          {/*  Header */}
          <div className="  bg-white   ">
            <div className="flex items-center justify-between  md:justify-end gap-4  py-4 px-8 shadow">
              <button
                onClick={() => setMobileOpen(true)}
                className=" rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out md:hidden"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              <div ref={dropdownRef} className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen(!profileOpen);
                  }}
                  className="bg-gray-200 h-8 w-8 flex items-center justify-center rounded-full"
                >
                  <User size={20} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border overflow-hidden z-50 backdrop-blur-2xl ">
                    <button
                      onClick={() => {
                        setLogoutModal(true);
                        setProfileOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
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

      {/* Logout Confirm Modal */}
      <ConfirmModal
        isOpen={logoutModal}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onCancel={() => setLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default AppLayout;
