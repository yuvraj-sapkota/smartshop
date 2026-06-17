import React, { useEffect } from "react";
import { Package } from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import useProductStore from "../../../store/productStore/productStore";
import StatusDropdown from "./adminProductComponents/statusDropdown";

const AdminProducts = () => {
  const {
    allProducts,
    loading,
    getAllProducts,
    updateProductStatus,
  } = useProductStore();

  const adminColumns = [
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
      header: "Seller",
      accessorKey: "seller",
      cell: (row) => (
        <div>
          <p className="font-medium text-gray-800">{row.seller?.storeName}</p>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) =>
        row.status === "pending" ? (
          <StatusDropdown
            productId={row._id}
            initialStatus={row.status}
            onUpdate={updateProductStatus}
          />
        ) : (
          <span 
          className={`font-medium px-3 py-1 rounded-full ${row.status === "approved" ? "text-green-600 bg-green-100  " : "bg-red-100   text-red-600 "}`}
          >{row.status}</span>
        ),
    },
    {
      header: "Date & Time",
      accessorKey: "createdAt",
      cell: (row) => (
        <span className="text-gray-600">
          {new Date(row.createdAt).toLocaleString()}
        </span>
      ),
    },
  ];

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="space-y-8 ">
      <PageHeader text="Product Management" />

      {loading && <p className="text-gray-400 text-sm">Loading...</p>}

      {!loading && allProducts.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <Package size={40} className="mx-auto mb-2" />
          <p>No products found</p>
        </div>
      )}

      {!loading && allProducts.length > 0 && (
        <DataTable columns={adminColumns} data={allProducts} />
      )}
    </div>
  );
};

export default AdminProducts;
