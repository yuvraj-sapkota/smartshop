import {
  Plus,
  MoreVertical,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  MoreHorizontal,
  Package,
} from "lucide-react";
import React, { useState } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import ActionMenu from "./productComponents/ActionMenu";
import ProductModal from "./productComponents/ProductModal";
import useProductStore from "../../../store/productStore/productStore";
import { useEffect } from "react";

const Product = () => {
  const [open, setOpen] = useState(false);
  const { products, loading, getMyProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    getMyProducts();
  }, []);

  const sellerColumns = [
    {
      header: "SN",
      accessorKey: "sn",
      cell: (_, index) => (
        <span className="font-medium text-gray-700">{index + 1}</span>
      ),
    },
    {
      header: "Product",
      accessorKey: "name",
      cell: (row) => (
        <div className="font-semibold text-gray-800">{row.name}</div>
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
          className={`px-2 py-1 rounded-full font-semibold text-xs ${
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
      cell: (row) => <ActionMenu row={row} onDelete={deleteProduct} />,
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

          {/* Loading */}
          {loading && <p className="text-gray-400 text-sm">Loading...</p>}

          {/* Empty state */}
          {!loading && products.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <Package size={40} className="mx-auto mb-2" />
              <p>No products found</p>
              <p className="text-sm">Add your first product to get started</p>
            </div>
          )}

          {/* Data */}
          {!loading && products.length > 0 && (
            <DataTable columns={sellerColumns} data={products} />
          )}
          {/* <DataTable columns={sellerColumns} data={products} /> */}
        </div>
      </div>
      {open && <ProductModal open={open} setOpen={setOpen} />}
    </>
  );
};

export default Product;
