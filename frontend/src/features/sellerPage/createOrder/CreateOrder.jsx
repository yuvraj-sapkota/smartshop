import { X } from "lucide-react";
import React, { useState } from "react";
import PageHeader from "../../../components/PageHeader";

const CreateOrder = () => {
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    { product: "Pen", qty: 2, price: 50 },
    { product: "Book", qty: 2, price: 100 },
    { product: "Oil", qty: 2, price: 150 },
  ]);

  // total per row
  const getRowTotal = (item) => item.qty * item.price;

  // grand total
  const grandTotal = items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  );

  // handle change
  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === "product" ? value : Number(value);
    setItems(updated);
  };

  // add new row
  const addRow = () => {
    setItems([...items, { product: "", qty: 1, price: 0 }]);
  };

  return (
    <>
      {/* Create Button */}

      <div className="flex items-center justify-between">
        <PageHeader text="Create" />
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Create Sales
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-[700px] rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create Sales Order</h2>
              <X
                onClick={() => setOpen(!open)}
                size={24}
                className="font-semibold text-lg  cursor-pointer"
              />
            </div>

            {/* Customer */}
            <div>
              <label className="text-sm text-gray-600">Customer Name</label>
              <input
                type="text"
                value=""
                placeholder="Enter customer name"
                className="w-full border px-3 py-2 rounded-lg mt-1 bg-gray-100 border-gray-400 outline-none"
              />
            </div>

            {/* TABLE */}
            <div className="border border-gray-400 rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-100 text-sm font-medium px-3 py-2">
                <span>Product</span>
                <span>Qty</span>
                <span>Price</span>
                <span>Total</span>
              </div>
              <div className="grid gap-2 grid-cols-4 px-3 py-2 border-t border-gray-400 text-sm items-center">
                {/* Product */}
                <input
                  className="border border-gray-400 px-2 py-1 rounded "
                  placeholder="eg pen"
                />

                {/* Qty */}
                <input
                  type="number"
                  className="border border-gray-400 px-2 py-1 rounded "
                  placeholder="eg 4"
                />

                {/* Price */}
                <input
                  className="border border-gray-400 px-2 py-1 rounded "
                  placeholder="eg Rs 50"
                />

                {/* Total */}
                <span className="font-medium">Rs 500 </span>
              </div>
            </div>

            {/* Add row */}
            <button className="text-blue-600 text-sm">+ Add Product</button>

            {/* GRAND TOTAL */}
            <div className="flex justify-end text-lg font-semibold">
              Total: Rs 5000
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button className="px-3 py-1 border rounded">Cancel</button>

              <button className="px-4 py-2 bg-green-600 text-white rounded">
                Submit Sell
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateOrder;
