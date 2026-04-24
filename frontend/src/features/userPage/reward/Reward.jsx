import React from "react";
import DataTable from "../../../components/DataTable";

const Reward = () => {
  const columns = [
    { header: "SN", accessorKey: "sn" },

    {
      header: "Reward",
      accessorKey: "reward",
      cell: (row) => (
        <span className="text-gray-800 font-semibold">{row.reward}</span>
      ),
    },

    {
      header: "Product",
      accessorKey: "product",
      cell: (row) => (
        <span className="font-medium text-gray-800">{row.product}</span>
      ),
    },

    { header: "Qty", accessorKey: "quantity" },

    {
      header: "MRP",
      accessorKey: "mrp",
      cell: (row) => <span className="text-gray-800">Rs {row.mrp}</span>,
    },

    {
      header: "Reward Type",
      accessorKey: "rewardType",
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium `}>
          {row.rewardType}
        </span>
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

  const data = [
    {
      _id: 101,
      sn: 1,
      reward: 20,
      product: "Pen",
      quantity: 2,
      mrp: 200,
      rewardType: "Cashback",
      datetime: "2026-04-23 10:30 AM",
    },
    {
      _id: 102,
      sn: 1,
      reward: 20,
      product: "Pen",
      quantity: 2,
      mrp: 200,
      rewardType: "user",
      datetime: "2026-04-23 10:30 AM",
    },
    {
      _id: 103,
      sn: 1,
      reward: 20,
      product: "Pen",
      quantity: 2,
      mrp: 200,
      rewardType: "seller",
      datetime: "2026-04-23 10:30 AM",
    },
  ];
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl text-primary mb-4">
        Reward
      </h1>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default Reward;
