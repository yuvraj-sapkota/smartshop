import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search, PackagePlus } from "lucide-react";

const ProductInput = ({ value, onChange, products }) => {
  const [query, setQuery] = useState(value || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  const filtered = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const exactMatch = products.some(
    (p) => p.name.toLowerCase() === query.toLowerCase()
  );

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

    // On iOS, scroll inside modal repositions everything — close dropdown on any scroll
    const handleScroll = () => {
      setShowSuggestions(false);
    };

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

  const handleSelect = (product) => {
    setQuery(product.name);
    // Pass productId so OrderItemsTable knows it is a registered product
    onChange(product.name, product.price ?? 0, product._id);
    setShowSuggestions(false);
  };

  const handleUseAsNew = () => {
    // Custom product — no productId
    onChange(query, 0, null);
    setShowSuggestions(false);
  };

  const dropdown = showSuggestions && query.trim().length > 0 && (
    <div
      style={dropdownStyle}
      className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
    >
      {filtered.length > 0 ? (
        <>
          <ul className="max-h-44 overflow-y-auto divide-y divide-gray-50">
            {filtered.map((product) => (
              <li
                key={product._id}
                // onMouseDown for desktop, onTouchEnd for iOS (fires before onBlur)
                onMouseDown={() => handleSelect(product)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleSelect(product);
                }}
                className="flex items-center justify-between px-3 py-2 hover:bg-blue-50 active:bg-blue-50 cursor-pointer transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {product.name}
                  </p>
                  {product.price != null && (
                    <p className="text-xs text-gray-400">Rs. {product.price}</p>
                  )}
                </div>
                <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">
                  Select
                </span>
              </li>
            ))}
          </ul>
          {!exactMatch && (
            <div className="border-t border-gray-100">
              <button
                onMouseDown={handleUseAsNew}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleUseAsNew();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-amber-50 active:bg-amber-50 text-amber-700 text-sm font-medium transition-colors"
              >
                <PackagePlus size={14} />
                Use "{query}" as new product
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="px-3 py-2 text-xs text-gray-400 text-center">
            No product found
          </div>
          <div className="border-t border-gray-100">
            <button
              onMouseDown={handleUseAsNew}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleUseAsNew();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-amber-50 active:bg-amber-50 text-amber-700 text-sm font-medium transition-colors"
            >
              <PackagePlus size={14} />
              Create &amp; sell "{query}"
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div ref={wrapperRef} className="relative w-full min-w-[180px]">
      <div className="relative">
        <Search
          size={13}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search product..."
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value, null);
            updateDropdownPosition();
            setShowSuggestions(true);
          }}
          onFocus={() => {
            updateDropdownPosition();
            setShowSuggestions(true);
          }}
          className="border border-gray-300 pl-7 pr-3 py-1.5 rounded-lg w-full text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
        />
      </div>

      {/* Portal: renders dropdown directly into document.body,
          escaping ALL parent overflow/transform/scroll contexts */}
      {createPortal(dropdown, document.body)}
    </div>
  );
};

export default ProductInput;