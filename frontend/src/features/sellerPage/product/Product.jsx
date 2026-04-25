import {
  Plus,
  MoreVertical,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import React, { useState } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import ActionMenu from "./productComponents/ActionMenu";
import ProductModal from "./productComponents/ProductModal";

const Product = () => {
  const [open, setOpen] = useState(false);
  const sellerData = [
    {
      _id: 1,
      sn: 1,
      product: "Pen",
      price: 20,
      commission: 5,
      status: "pending",
    },
    {
      _id: 2,
      sn: 2,
      product: "Notebook",
      price: 100,
      commission: 10,
      status: "approved",
    },
    {
      _id: 3,
      sn: 2,
      product: "Notebook",
      price: 100,
      commission: 10,
      status: "rejected",
    },
  ];

  const sellerColumns = [
    {
      header: "SN",
      accessorKey: "sn",
      cell: (row) => <span className="ont-medium text-gray-700">{row.sn}</span>,
    },
    {
      header: "Product",
      accessorKey: "product",
      cell: (row) => (
        <div className="font-semibold text-gray-800">{row.product}</div>
      ),
    },

    {
      header: "Price",
      accessorKey: "price",
      cell: (row) => <span>Rs {row.price}</span>,
    },

    {
      header: "Commission",
      accessorKey: "commission",
      cell: (row) => (
        <span className="text-purple-600 font-medium">Rs {row.commission}</span>
      ),
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full  font-semibold ${
            row.status === "rejected"
              ? "bg-red-100 text-red-600"
              : row.status === "approved"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
      header: "Action",
      accessorKey: "action",
      cell: (row) => <ActionMenu row={row} />,
    },
  ];
  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <PageHeader text="Product Management" />
          <button
            onClick={() => setOpen(true)}
            className="flex items-center bg-primary text-white px-4 py-2 rounded-lg font-medium justify-center gap-1 text-sm"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>

        <div className=" flex  flex-col gap-2">
          <h1 className="font-semibold text-base md:text-lg text-gray-700">
            All Products
          </h1>

          <DataTable columns={sellerColumns} data={sellerData} />
        </div>
      </div>
      {open && <ProductModal open={open} setOpen={setOpen} />}
    </>
  );
};

export default Product;
