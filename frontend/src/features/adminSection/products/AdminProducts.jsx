import React from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";

const AdminProducts = () => {
  const adminData = [
    {
      _id: 1,
      sn: 1,
      product: "Pen",
      price: 20,
      commission: 5,
      seller: "Ram Store",
      status: "pending",
      datetime: "2026-04-28 09:30 AM",
    },
    {
      _id: 2,
      sn: 2,
      product: "Notebook",
      price: 100,
      commission: 10,
      seller: "Shyam Store",
      status: "rejected",
      datetime: "2026-04-27 04:15 PM",
    },
  ];
  const adminColumns = [
    {
      header: "SN",
      accessorKey: "sn",
      cell: (row) => (
        <span className="font-medium text-gray-700">{row.sn}</span>
      ),
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
      header: "Seller",
      accessorKey: "seller",
      cell: (row) => (
        <span className="font-medium text-gray-700">{row.seller}</span>
      ),
    },

    // 🔥 STATUS DROPDOWN
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <select
          defaultValue={row.status}
          className={`px-2 py-1 rounded-full font-semibold outline-none ${
            row.status === "rejected"
              ? "bg-red-100 text-red-600"
              : row.status === "approved"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      ),
    },

    {
      header: "Date & Time",
      accessorKey: "datetime",
      cell: (row) => <span className="text-gray-600">{row.datetime}</span>,
    },
  ];
  return (
    <>
      <div className="space-y-8">
        <PageHeader text="Product Management" />
        <DataTable columns={adminColumns} data={adminData} />
      </div>
    </>
  );
};

export default AdminProducts;
