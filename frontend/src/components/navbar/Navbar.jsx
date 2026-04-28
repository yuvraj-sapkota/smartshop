import { useState, useRef, useEffect } from "react";
import { Menu, Search, X, Plus, User } from "lucide-react";
import Logo from "../logo/Logo";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 mb-8">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-2 w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 border border-gray-200 outline-none"
            />
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition">
              Search
            </button>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Plus Button */}
            {/* <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
              <Plus size={20} />
            </button> */}

            {/* Login */}
            <button
              onClick={() => {
                localStorage.setItem("role", "user");
                navigate("/user/shop");
              }}
              className="px-4 py-2 border rounded-lg text-primary hover:bg-primary hover:text-white transition"
            >
              Login
            </button>
            <button
              onClick={() => {
                localStorage.setItem("role", "seller");
                navigate("/seller/seller-dashboard");
              }}
              className="px-4 py-2 border rounded-lg text-primary hover:bg-primary hover:text-white transition"
            >
              Become a seller
            </button>
            <button
              onClick={() => {
                localStorage.setItem("role", "admin");
                navigate("/admin/admin-dashboard");
              }}
              className="px-4 py-2 border rounded-lg text-primary hover:bg-primary hover:text-white transition"
            >
              Admin
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-3 md:hidden text-gray-700">
            {/* Search */}
            <Search
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />

            {/* Plus */}
            <Plus className="cursor-pointer hover:scale-110 transition" />

            {/* Menu */}
            <Menu
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => setIsMenuOpen(true)}
            />
          </div>
        </div>

        {/* Mobile Search */}
        <div
          className={`md:hidden px-4 overflow-hidden transition-all duration-300 ${
            isSearchOpen ? "max-h-20 py-2" : "max-h-0"
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 border focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </nav>
      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-gray-800 z-50 shadow-xl transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-semibold">Menu</h2>
          <X
            className="cursor-pointer hover:rotate-90 transition"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>

        <div className="flex flex-col p-4 gap-4">
          {/* Example Links */}
          <p href="#" className="hover:text-gray-500 transition">
            About
          </p>

          {/* Login */}
          <button
            onClick={() => {
              localStorage.setItem("role", "user");
              navigate("/user/dashboard");
            }}
            className="px-4 py-2 border rounded-lg hover:bg-gray-900 hover:text-white transition"
          >
            Login
          </button>
          <button
            onClick={() => {
              localStorage.setItem("role", "seller");
              navigate("/seller/seller-dashboard");
            }}
            className="px-4 py-2 border rounded-lg hover:bg-gray-900 hover:text-white transition"
          >
            Become a seller
          </button>
          <button
            onClick={() => {
              localStorage.setItem("role", "admin");
              navigate("/admin/admin-dashboard");
            }}
            className="px-4 py-2 border rounded-lg hover:bg-gray-900 hover:text-white transition"
          >
            Admin
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
