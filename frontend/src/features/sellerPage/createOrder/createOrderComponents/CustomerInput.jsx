import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search, User } from "lucide-react";

const CustomerInput = ({ value, onChange, customers }) => {
  const [query, setQuery] = useState(value || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  const filtered = query.trim()
    ? customers.filter(
        (c) =>
          c.username.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const updateDropdownPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
  };

  useEffect(() => {
    if (!showSuggestions) return;
    const handleClickOutside = (e) => {
      
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    const handleScroll = () => setShowSuggestions(false);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", updateDropdownPosition);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", updateDropdownPosition);
    };
  }, [showSuggestions]);

  const handleSelect = (customer) => {
    setQuery(customer.username);
    onChange(customer);
    setShowSuggestions(false);
  };

  const dropdown = showSuggestions && query.trim().length > 0 && (
    <div
      style={dropdownStyle}
      className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
    >
      {filtered.length > 0 ? (
        <ul className="max-h-44 overflow-y-auto divide-y divide-gray-50 ">
          {filtered.map((customer) => (
            <li
              key={customer._id}
              onMouseDown={() => handleSelect(customer)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleSelect(customer);
              }}
              className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 active:bg-blue-50 cursor-pointer transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User size={13} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {customer.username}
                </p>
                <p className="text-xs text-gray-400">{customer.email}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-3 py-3 text-center">
          <p className="text-sm text-red-500 font-medium">Customer not found</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Only registered users can be added
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Search
          size={13}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search by username or email..."
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(null);
            updateDropdownPosition();
            setShowSuggestions(true);
          }}
          onFocus={() => {
            updateDropdownPosition();
            setShowSuggestions(true);
          }}
          className="w-full border border-gray-300 pl-7 pr-3 py-2.5 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
        />
      </div>

      {createPortal(dropdown, document.body)}
    </div>
  );
};

export default CustomerInput;
