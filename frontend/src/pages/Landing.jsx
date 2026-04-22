import { useState, useRef, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";

export default function Navbar() {
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
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur shadow-md">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between ">
          
          {/* Logo */}
          <h1 className="text-xl font-bold text-white">SmartShop</h1>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-2 w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Search
            </button>
          </div>

          {/* Desktop Login */}
          <div className="hidden md:block">
            <button className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white hover:text-[#0f172a] transition">
              Login
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-3 md:hidden text-white">
            
            <Search
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />

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
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0f172a] text-white z-50 shadow-xl transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-white/20">
          <h2 className="font-semibold">Menu</h2>
          <X
            className="cursor-pointer hover:rotate-90 transition"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>

        <div className="flex flex-col p-4 gap-4">
          {/* <a href="#" className="hover:text-blue-400 transition">Home</a>
          <a href="#" className="hover:text-blue-400 transition">About</a>
          <a href="#" className="hover:text-blue-400 transition">Services</a>
          <a href="#" className="hover:text-blue-400 transition">Contact</a> */}

          <button className="mt-4 px-4 py-2 border border-white/30 rounded-lg hover:bg-white hover:text-[#0f172a] transition">
            Login
          </button>
        </div>
      </div>
    </>
  );
}