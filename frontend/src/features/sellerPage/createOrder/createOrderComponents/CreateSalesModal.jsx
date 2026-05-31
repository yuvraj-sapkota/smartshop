// store bata products fetch garcha, modal open/close matra handle garcha

import React, { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import OrderItemsTable from "./OrderItemsTable";
import { showError } from "../../../../utils/toast";

const CreateSalesModal = ({ open, onClose, products }) => {
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([
    { _id: Date.now(), product: "", qty: 1, price: 0 },
  ]);

  const totalAmount = items.reduce((sum, row) => sum + row.qty * row.price, 0);

  const handleClose = () => {
    setCustomerName("");
    setItems([{ _id: Date.now(), product: "", qty: 1, price: 0 }]);
    onClose();
  };

  const handleSubmit = () => {
    if (!customerName.trim()) return showError("Customer name required");
    const hasEmpty = items.some((i) => !i.product.trim());
    if (hasEmpty) return showError(" product names required");

    const orderData = { customerName, items, total: totalAmount };
    console.log("Order submitted:", orderData);
    // TODO: call your order API here
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl px-5 py-5 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <ShoppingCart size={16} className="text-primary" />
            </div>
            <h2 className="text-base font-semibold text-gray-800">
              Create Sales Order
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-1.5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Customer Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
            Customer Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            className="w-full border border-gray-300 px-3.5 py-2.5 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Items Table */}
        <OrderItemsTable
          items={items}
          setItems={setItems}
          products={products}
        />

        {/* Footer */}
        <div className="flex items-end justify-end flex-col gap-4 pt-2 border-t border-gray-100">
          <p className="font-semibold text-gray-700">
            Total:{" "}
            <span className="text-primary">
              Rs. {totalAmount.toLocaleString()}
            </span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="border border-gray-300 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-colors"
            >
              Submit Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSalesModal;
