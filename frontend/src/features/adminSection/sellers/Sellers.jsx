import React from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";

const Sellers = () => {
  const storeData = [
    {
      _id: 1,
      sn: 1,
      store: "Shyam store",
      name: "Shyam",
      username: "shyam24",
      needToPay: 500,
      status: "approved",
      refer: "Ishor",
      datetime: "2026-04-24 10:30 AM",
    },
    {
      _id: 2,
      sn: 2,
      store: "Ram store",
      name: "Shyam",
      username: "Ram108",
      needToPay: 500,
      status: "approved",
      refer: "Ishor",
      datetime: "2026-04-24 10:30 AM",
    },
  ];
  const storeColumns = [
    {
      header: "Store",
      accessorKey: "store",
      cell: (row) => (
        <span className="font-semibold text-gray-800">{row.store}</span>
      ),
    },

    { header: "SN", accessorKey: "sn" },

    {
      header: "Name",
      accessorKey: "name",
    },

    {
      header: "Username",
      accessorKey: "username",
    },

    {
      header: "Need to Pay",
      accessorKey: "needToPay",
      cell: (row) =>
        row.status === "approved" ? (
          <span className="text-blue-600 font-semibold">
            Rs {row.needToPay}
          </span>
        ) : (
          <span className="text-gray-400">--</span>
        ),
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const color =
          row.status === "approved" ? "text-green-600" : "text-yellow-600";

        return (
          <span className={`font-semibold capitalize ${color}`}>
            {row.status}
          </span>
        );
      },
    },

    {
      header: "Refer",
      accessorKey: "refer",
    },

    {
      header: "Time",
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
      <PageHeader text="Sellers" />
      <DataTable data={storeData} columns={storeColumns} />
    </>
  );
};

export default Sellers;
