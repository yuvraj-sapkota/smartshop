import { Edit, MoreHorizontal, Trash } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const ActionMenu = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuHeight = 80; // approximate dropdown height

      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpward = spaceBelow < menuHeight + 8;

      setMenuPosition({
        top: openUpward
          ? rect.top - menuHeight + window.scrollY
          : rect.bottom + window.scrollY + 4,
        left: rect.right - 144, // 144 = w-36
      });
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative flex justify-center" ref={menuRef}>
      {/* Trigger */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
      >
        <MoreHorizontal size={18} className="text-gray-600" />
      </button>

      {/* Dropdown - fixed position to escape overflow:hidden */}
      {open && (
        <div
          style={{ top: menuPosition.top, left: menuPosition.left }}
          className="fixed w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] py-1"
        >
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
            <Edit size={16} />
            Edit
          </button>
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition">
            <Trash size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
