import { X, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import useProductStore from "../../../store/productStore/productStore";
import DataTable from "../../../components/DataTable";
import { showError, showSuccess } from "../../../utils/toast";
import { createOrderAPI } from "../../../services/order/order.api";

const genId = () =>
  typeof crypto?.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const newRow = () => ({
  _id: genId(),
  product: "",
  productName: "",
  qty: 1,
  price: 0,
});

const CreateOrder = () => {
  const products = useProductStore((state) => state.products);
  const getMyProducts = useProductStore((state) => state.getMyProducts);

  useEffect(() => {
    getMyProducts();
  }, [getMyProducts]);

  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([newRow()]);
  const [loading, setLoading] = useState(false);

  // ───────────────── helpers ─────────────────
  const handleChange = (index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];

      // PRODUCT SEARCH
      if (field === "productName") {
        const selectedProduct = products.find(
          (p) => p.name.toLowerCase() === value.toLowerCase(),
        );

        updated[index] = {
          ...updated[index],
          productName: value,
          product: selectedProduct?._id || "",
          price: selectedProduct?.price || 0,
        };
      }

      // QTY
      else if (field === "qty") {
        updated[index] = {
          ...updated[index],
          qty: value === "" ? "" : Number(value),
        };
      }

      return updated;
    });
  };

  const addRow = () => {
    setItems((prev) => [...prev, newRow()]);
  };

  const removeRow = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const grandTotal = items.reduce(
    (acc, item) =>
      acc + (Number(item.qty) || 0) * (Number(item.price) || 0),
    0,
  );

  const handleClose = () => {
    setOpen(false);
    setCustomer("");
    setItems([newRow()]);
  };

  // ───────────────── validation ─────────────────
  const validate = () => {
    if (!customer.trim()) {
      showError("Customer name is required");
      return false;
    }

    for (let i = 0; i < items.length; i++) {
      if (!items[i].product) {
        showError(`Row ${i + 1}: please select a valid product`);
        return false;
      }

      if (!items[i].qty || items[i].qty < 1) {
        showError(`Row ${i + 1}: quantity must be at least 1`);
        return false;
      }
    }

    // duplicate check
    const ids = items.map((i) => i.product).filter(Boolean);

    if (new Set(ids).size !== ids.length) {
      showError("Duplicate products found — merge them into one row");
      return false;
    }

    return true;
  };

  // ───────────────── submit ─────────────────
  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      customer: customer.trim(),
      items: items.map((i) => ({
        productId: i.product,
        qty: Number(i.qty),
      })),
    };

    try {
      setLoading(true);

      const data = await createOrderAPI(payload);

      console.log(data);

      showSuccess(data.message);

      handleClose();
    } catch (err) {
      showError(err?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  // ───────────────── columns ─────────────────
  const columns = [
    {
      header: "Product",
      cell: (row, index) => (
        <div>
          <input
            type="text"
            list={`products-${index}`}
            value={row.productName}
            onChange={(e) =>
              handleChange(index, "productName", e.target.value)
            }
            placeholder="Search product..."
            className="border px-2 py-1 rounded w-full outline-none"
          />

          <datalist id={`products-${index}`}>
            {products.map((p) => (
              <option key={p._id} value={p.name} />
            ))}
          </datalist>
        </div>
      ),
    },

    {
      header: "Qty",
      cell: (row, index) => (
        <input
          type="number"
          min="1"
          value={row.qty}
          onChange={(e) => handleChange(index, "qty", e.target.value)}
          className="border px-2 py-1 rounded w-20 outline-none"
        />
      ),
    },

    {
      header: "Price",
      cell: (row) => (
        <input
          value={row.price}
          readOnly
          className="border px-2 py-1 rounded bg-gray-100 w-24"
        />
      ),
    },

    {
      header: "Total",
      cell: (row) => (
        <span className="font-medium">
          Rs {(Number(row.qty) || 0) * (Number(row.price) || 0)}
        </span>
      ),
    },

    {
      header: "Action",
      cell: (_, index) => (
        <button
          onClick={() => removeRow(index)}
          disabled={items.length === 1}
          className="text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Trash2 size={18} />
        </button>
      ),
    },
  ];

  // ───────────────── dummy sales data ─────────────────
  const data = [
    {
      _id: 101,
      sn: 1,
      product: "Pen",
      qty: 2,
      price: 100,
      totalPrice: 200,
      buyer: "Ram",
      commission: 5,
      time: "2026-04-25 11:00 AM",
    },
    {
      _id: 102,
      sn: 2,
      product: "Book",
      qty: 1,
      totalPrice: 500,
      price: 500,
      buyer: "Hari",
      commission: 10,
      time: "2026-04-25 12:30 PM",
    },
  ];

  const salesColumn = [
    { header: "SN", accessorKey: "sn" },

    {
      header: "Product",
      accessorKey: "product",
      cell: (row) => (
        <div className="font-medium text-gray-800">{row.product}</div>
      ),
    },

    { header: "Qty", accessorKey: "qty" },

    { header: "Price", accessorKey: "price" },

    {
      header: "Total Price",
      accessorKey: "totalPrice",
      cell: (row) => <span>Rs {row.totalPrice}</span>,
    },

    {
      header: "Buyer",
      accessorKey: "buyer",
      cell: (row) => (
        <span className="font-semibold text-gray-700">{row.buyer}</span>
      ),
    },

    {
      header: "Commission",
      accessorKey: "commission",
      cell: (row) => (
        <span className="text-purple-600 font-medium">
          Rs {row.commission}
        </span>
      ),
    },

    {
      header: "Time",
      accessorKey: "time",
      cell: (row) => (
        <span className="text-gray-500 text-xs whitespace-nowrap">
          {row.time}
        </span>
      ),
    },
  ];

  // ───────────────── render ─────────────────
  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <PageHeader text="Create" />

          <button
            onClick={() => setOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Create Sales
          </button>
        </div>

        <div>
          <h1 className="font-semibold text-base md:text-lg text-gray-700">
            Sales History
          </h1>

          <DataTable columns={salesColumn} data={data} />
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 px-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className="bg-white w-[800px] rounded-lg p-4 space-y-4 overflow-x-auto">
            {/* header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Create Sales Order
              </h2>

              <X
                onClick={handleClose}
                className="cursor-pointer"
              />
            </div>

            {/* customer */}
            <div>
              <label className="text-sm text-gray-600">
                Customer Name
              </label>

              <input
                type="text"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="Enter customer name"
                className="w-full border px-3 py-2 rounded-lg mt-1 outline-none"
              />
            </div>

            {/* table */}
            <DataTable columns={columns} data={items} />

            {/* add row */}
            <button
              onClick={addRow}
              className="text-blue-600 text-sm"
            >
              + Add Product
            </button>

            {/* total */}
            <div className="flex justify-end text-lg font-semibold">
              Total: Rs {grandTotal}
            </div>

            {/* actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Sell"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateOrder;