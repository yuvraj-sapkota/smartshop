import React from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";

const UserCommission = () => {
  const rewardData = [
    {
      _id: 1,
      sn: 1,
      reward: 5,
      product: "Pen",
      quantity: 2,
      price: 20,
      totalPrice: 40,
      referredBy: "Ram Store",
      earnBy: "John",
      datetime: "2026-04-28 11:00 AM",
    },
  ];

  const rewardColumns = [
    {
      header: "SN",
      accessorKey: "sn",
      cell: (row) => <span className="font-medium">{row.sn}</span>,
    },
    {
      header: "Reward",
      accessorKey: "reward",
      cell: (row) => (
        <span className="text-green-600 font-medium">Rs {row.reward}</span>
      ),
    },
    {
      header: "Product",
      accessorKey: "product",
      cell: (row) => <span>{row.product}</span>,
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
      cell: (row) => <span>{row.quantity}</span>,
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: (row) => <span>Rs {row.price}</span>,
    },
    {
      header: "Total Price",
      accessorKey: "totalPrice",
      cell: (row) => (
        <span className="font-semibold ">Rs {row.totalPrice}</span>
      ),
    },
    {
      header: "Referred By",
      accessorKey: "referredBy",
      cell: (row) => <span>{row.referredBy}</span>,
    },
    {
      header: "Earn By",
      accessorKey: "earnBy",
      cell: (row) => <span>{row.earnBy}</span>,
    },
    {
      header: "Time & Date",
      accessorKey: "datetime",
      cell: (row) => <span>{row.datetime}</span>,
    },
  ];
  return (
    <>
      <div className="space-y-8 ">
        <PageHeader text="User Commmission" />
        <DataTable data={rewardData} columns={rewardColumns} />
      </div>
    </>
  );
};

export default UserCommission;
