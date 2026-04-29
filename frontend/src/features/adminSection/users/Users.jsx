import React from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";

const Users = () => {
  const userData = [
    {
      _id: 1,
      sn: 1,
      name: "Ishor",
      username: "ishor12",
      needToPay: 120,
      status: "approved", // or pending
      referBy: "Ram",
      datetime: "2026-04-24 10:30 AM",
    },
    {
      _id: 2,
      sn: 2,
      name: "Shyam",
      username: "shyam12",
      needToPay: 220,
      status: "pending", // or pending
      referBy: "A seller",
      datetime: "2026-04-24 10:30 AM",
    },
  ];

  const userColumns = [
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
      cell: (row) => {
        // 👉 status approved भए मात्र show हुन्छ
        return row.status === "approved" ? (
          <span className="font-semibold text-blue-600">
            Rs. {row.needToPay}
          </span>
        ) : (
          <span className="text-gray-400">--</span>
        );
      },
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const color =
          row.status === "pending" ? "text-yellow-600" : "text-green-600";

        return (
          <span className={`font-semibold capitalize ${color}`}>
            {row.status}
          </span>
        );
      },
    },

    {
      header: "Refer By",
      accessorKey: "referBy",
    },

    {
      header: "Time & Date",
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
      <PageHeader text="Users" />
      <DataTable columns={userColumns} data={userData} />
    </>
  );
};

export default Users;
