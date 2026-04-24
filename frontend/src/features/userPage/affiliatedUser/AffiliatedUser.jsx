import React from "react";
import DataTable from "../../../components/DataTable";

const AffiliatedUser = () => {
  const data = [
    {
      sn: 1,
      storeName: "ABC Store",
      totalSales: 5000,
      datetime: "2026-04-23 10:30 AM",
    },
    {
      sn: 2,
      storeName: "XYZ Shop",
      totalSales: 12000,
      datetime: "2026-04-23 12:15 PM",
    },
  ];

  const columns = [
    {
      header: "SN",
      accessorKey: "sn",
    },

    {
      header: "Store Name",
      accessorKey: "storeName",
      cell: (row) => (
        <span className="font-medium text-gray-800">{row.storeName}</span>
      ),
    },

    {
      header: "Total Sales or Purchased",
      accessorKey: "totalSales",
      cell: (row) => (
        <span className="text-gray-800 font-semibold">Rs {row.totalSales}</span>
      ),
    },

    {
      header: "Date & Time",
      accessorKey: "datetime",
      cell: (row) => (
        <span className="text-gray-500 text-xs whitespace-nowrap">
          {row.datetime}
        </span>
      ),
    },
  ];

  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl text-primary mb-4">
        Affiliated Users
      </h1>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default AffiliatedUser;
