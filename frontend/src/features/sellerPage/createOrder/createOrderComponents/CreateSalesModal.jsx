import React, { useState, useEffect } from "react";
import { ShoppingCart, X, User } from "lucide-react";
import OrderItemsTable from "./OrderItemsTable";
import CustomerInput from "./CustomerInput";
import { showError } from "../../../../utils/toast";
import useCustomerStore from "../../../../store/customerStore/customerStore";
import useOrderStore from "../../../../store/orderStore/orderStore";

const CreateSalesModal = ({ open, onClose, products }) => {
  // console.log(open, products);
  const customers = useCustomerStore((state) => state.customers);
  const getCustomers = useCustomerStore((state) => state.getCustomers);



  const createOrder = useOrderStore((state) => state.createOrder);
  const loading = useOrderStore((state) => state.loading);
  

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [items, setItems] = useState([
    { _id: Date.now(), product: "", productId: null, qty: 1, price: 0 },
  ]);

  useEffect(() => {
    if (open) getCustomers();
  }, [open, getCustomers]);



  const totalAmount = items.reduce(
    (sum, row) => sum + Number(row.qty) * Number(row.price),
    0,
  );

  const handleClose = () => {
    setSelectedCustomer(null);
    setItems([
      { _id: Date.now(), product: "", productId: null, qty: 1, price: 0 },
    ]);
    onClose();
  };

  const handleSubmit = async () => {
    // Validate
    if (!selectedCustomer)
      return showError("Please select a registered customer");

    const hasEmptyProduct = items.some((i) => !i.product.trim());
    if (hasEmptyProduct) return showError("All product names are required");

    const hasInvalidPrice = items.some(
      (i) => !i.productId && (i.price === "" || Number(i.price) < 0),
    );
    if (hasInvalidPrice)
      return showError("Custom products must have a valid price");

    // Transform items for backend
    const transformedItems = items.map((item) => {
      if (item.productId) {
        // Registered product — backend resolves price from DB
        return {
          productId: item.productId,
          qty: Number(item.qty),
        };
      } else {
        // Custom product — send name + price
        return {
          productName: item.product,
          qty: Number(item.qty),
          price: Number(item.price),
        };
      }
    });

    const orderData = {
      customerId: selectedCustomer._id,
      items: transformedItems,
    };

    const success = await createOrder(orderData);
    if (success) handleClose();
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

        {/* Customer Search */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 ">
            User name
          </label>
          <CustomerInput
            value={selectedCustomer?.username || ""}
            customers={customers}
            onChange={(customer) => setSelectedCustomer(customer)}
          />
          {/* {selectedCustomer && (
            <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg">
              <User size={13} className="text-blue-500" />
              <span className="text-sm text-blue-700 font-medium">
                {selectedCustomer.username}
              </span>
              <span className="text-xs text-blue-400">
                {selectedCustomer.email}
              </span>
            </div>
          )} */}
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
              disabled={loading}
              className="border border-gray-300 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Sell"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSalesModal;
