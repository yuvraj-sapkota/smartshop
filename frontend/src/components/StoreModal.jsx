import { X } from "lucide-react";
import React from "react";

const StoreModal = ({ finalInitials, store, setShowModal }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-md"
        onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
      >
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-xl ">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white px-3 py-2 rounded-lg text-sm">
                {finalInitials}
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-800">
                  {store.storeName}
                </h2>
                <p className="text-xs text-gray-500">
                  {store.products.length} products
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto flex-1 px-5 ">
            {store.products.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">{item.measure}</p>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  Rs {Number(item.price).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Modal Footer */}
          <div className="p-5 border-t border-gray-200">
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 text-sm border rounded-lg hover:bg-gray-100 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreModal;
