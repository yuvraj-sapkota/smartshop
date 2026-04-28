import React from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";

const SalesHistory = () => {
  const salesData = [
    {
      _id: 1,
      sn: 1,
      product: "Pen",
      quantity: 2,
      price: 20,
      totalPrice: 40,
      commission: 5,
      seller: "Ram Store",
      customer: "John",
      datetime: "2026-04-28 10:00 AM",
    },
    {
      _id: 2,
      sn: 2,
      product: "Pen",
      quantity: 2,
      price: 20,
      totalPrice: 40,
      commission: 5,
      seller: "Ram Store",
      customer: "John",
      datetime: "2026-04-28 10:00 AM",
    },
  ];
  const salesColumns = [
    {
      header: "SN",
      accessorKey: "sn",
      cell: (row) => <span className="ont-medium text-gray-700">{row.sn}</span>,
    },
    {
      header: "Product",
      accessorKey: "product",
      cell: (row) => (
        <div className="font-semibold text-gray-800">{row.product}</div>
      ),
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
      cell: (row) => (
        <div className="font-semibold text-gray-800">{row.quantity}</div>
      ),
    },

    {
      header: "Price",
      accessorKey: "price",
      cell: (row) => <span>Rs {row.price}</span>,
    },
    {
      header: "Total Price",
      accessorKey: "totalPrice",
      cell: (row) => <span>Rs {row.totalPrice}</span>,
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
      cell: (row) => <span className=" font-medium"> {row.seller}</span>,
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: (row) => <span className=" font-medium"> {row.customer}</span>,
    },
    {
      header: "Time",
      accessorKey: "datetime",
      cell: (row) => <span className=" text-sm"> {row.datetime}</span>,
    },
  ];
  return (
    <>
      <div className="space-y-8">
        <PageHeader text="Sales History" />
        <DataTable data={salesData} columns={salesColumns} />
      </div>
    </>
  );
};

export default SalesHistory;
