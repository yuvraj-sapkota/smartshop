import React from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";

const Commission = () => {
  const data = [
    {
      _id: 101,
      sn: 1,
      commission: 5,
      mrp: 200,
      product: "Pen",
      qty: 2,
      buyer: "Ram",
      time: "2026-04-25 11:00 AM",
    },
    {
      _id: 102,
      sn: 2,
      commission: 5,
      mrp: 200,
      product: "Pen",
      qty: 2,
      buyer: "Ram",
      time: "2026-04-25 11:00 AM",
    },
    {
      _id: 103,
      sn: 3,
      commission: 5,
      mrp: 200,
      product: "Pen",
      qty: 2,
      buyer: "Ram",
      time: "2026-04-25 11:00 AM",
    },
  ];
  const columns = [
    { header: "SN", accessorKey: "sn" },

    {
      header: "Commission",
      accessorKey: "commission",
      cell: (row) => (
        <span className="text-purple-600 font-medium">Rs {row.commission}</span>
      ),
    },

    {
      header: "MRP",
      accessorKey: "mrp",
      cell: (row) => <span>Rs {row.mrp}</span>,
    },

    {
      header: "Product",
      accessorKey: "product",
      cell: (row) => (
        <div className="font-medium text-gray-800">{row.product}</div>
      ),
    },

    { header: "Qty", accessorKey: "qty" },

    {
      header: "Buyer",
      accessorKey: "buyer",
      cell: (row) => (
        <span className="font-semibold text-gray-700">{row.buyer}</span>
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
        <PageHeader text="Comission for Admin" />

        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default Commission;
