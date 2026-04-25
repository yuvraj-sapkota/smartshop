import React from "react";
import DataTable from "../../../components/DataTable";
import PageHeader from "../../../components/PageHeader";

const Sales = () => {
  const data = [
    {
      _id: 101,
      sn: 1,
      product: "Pen",
      qty: 2,
      totalPrice: 200,
      buyer: "Ram",
      commission: 5,
      time: "2026-04-25 11:00 AM",
    },
    {
      _id: 102,
      sn: 1,
      product: "Pen",
      qty: 2,
      totalPrice: 200,
      buyer: "Ram",
      commission: 5,
      time: "2026-04-25 11:00 AM",
    },
  ];

  const columns = [
    { header: "SN", accessorKey: "sn" },

    {
      header: "Product",
      accessorKey: "product",
      cell: (row) => (
        <div className="font-medium text-gray-800">{row.product}</div>
      ),
    },

    { header: "Qty", accessorKey: "qty" },

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
        <span className="text-purple-600 font-medium">Rs {row.commission}</span>
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
  return (
    <>
      <div className="space-y-8">
        <PageHeader text="Sales" />

        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default Sales;
