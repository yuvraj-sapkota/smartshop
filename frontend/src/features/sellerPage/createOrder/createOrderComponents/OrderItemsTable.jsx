import React from "react";
import { Trash2, Plus } from "lucide-react";
import ProductInput from "./ProductInput";

// Grid template — header ra rows duwai same columns use garxa, perfect alignment
const GRID = "240px 80px 110px 100px 60px";

const OrderItemsTable = ({ items, setItems, products }) => {
  const handleNumericChange = (index, field, raw) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: raw } : item)),
    );
  };

  const handleNumericBlur = (index, field, raw) => {
    const num = Number(raw);
    const clamped =
      field === "qty"
        ? isNaN(num) || num < 1
          ? 1
          : Math.floor(num)
        : isNaN(num) || num < 0
        ? 0
        : num;
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: clamped } : item,
      ),
    );
  };

  const handleProductSelect = (index, productName, price) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        return {
          ...item,
          product: productName,
          ...(price !== null ? { price } : {}),
        };
      }),
    );
  };

  const handleDelete = (index) => {
    setItems((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const addRow = () => {
    setItems((prev) => [
      { _id: Date.now(), product: "", qty: 1, price: 0 },
      ...prev,
    ]);
  };

  const cellClass = "px-3 py-3 flex items-center";

  return (
    <div className="space-y-3">
      <div className="rounded-md shadow-md border border-gray-200 bg-white overflow-hidden pb-4">
        {/* Horizontal scroll on mobile */}
        <div className="overflow-x-auto">
          <div style={{ minWidth: "600px" }}>
            {/* HEADER — always visible, never scrolls */}
            <div
              className="grid bg-gray-100 text-gray-700 uppercase text-xs tracking-wider font-medium"
              style={{ gridTemplateColumns: GRID }}
            >
              {["Product", "Qty", "Price", "Total", "Action"].map((col) => (
                <div key={col} className="px-3 py-4 whitespace-nowrap">
                  {col}
                </div>
              ))}
            </div>

            {/* ROWS — scrollable, max 3 rows tall */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "168px" }} // ~3 rows
            >
              {items.length === 0 ? (
                <div className="text-center p-6 text-gray-400 text-sm">
                  No items added
                </div>
              ) : (
                items.map((row, index) => (
                  <div
                    key={row._id}
                    className="grid border-t border-gray-100 hover:bg-gray-50 transition "
                    style={{ gridTemplateColumns: GRID }}
                  >
                    {/* PRODUCT */}
                    <div className={cellClass}>
                      <ProductInput
                        value={row.product}
                        products={products}
                        onChange={(name, price) =>
                          handleProductSelect(index, name, price)
                        }
                      />
                    </div>

                    {/* QTY */}
                    <div className={cellClass}>
                      <input
                        type="number"
                        value={row.qty}
                        onChange={(e) =>
                          handleNumericChange(index, "qty", e.target.value)
                        }
                        onBlur={(e) =>
                          handleNumericBlur(index, "qty", e.target.value)
                        }
                        className="border border-gray-300 px-2 py-1.5 rounded-lg w-full text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
                      />
                    </div>

                    {/* PRICE */}
                    <div className={cellClass}>
                      <input
                        type="number"
                        value={row.price}
                        onChange={(e) =>
                          handleNumericChange(index, "price", e.target.value)
                        }
                        onBlur={(e) =>
                          handleNumericBlur(index, "price", e.target.value)
                        }
                        className="border border-gray-300 px-2 py-1.5 rounded-lg w-full text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
                      />
                    </div>

                    {/* TOTAL */}
                    <div className={cellClass}>
                      <span className="font-semibold text-gray-700 text-sm">
                        Rs.{" "}
                        {(Number(row.qty) * Number(row.price)).toLocaleString()}
                      </span>
                    </div>

                    {/* ACTION */}
                    <div className={cellClass}>
                      <button
                        onClick={() => handleDelete(index)}
                        disabled={items.length === 1}
                        className="text-red-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={addRow}
        className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary-hover transition-colors"
      >
        <Plus size={15} /> Add Product
      </button>
    </div>
  );
};

export default OrderItemsTable;
