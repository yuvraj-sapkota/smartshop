import React from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";

const SellerCommission = () => {
  const commissionData = [
    {
      _id: 1,
      sn: 1,
      commission: 5,
      product: "Pen",
      quantity: 2,
      price: 20,
      totalPrice: 40,
      customer: "John",
      seller: "Ram Store",
      datetime: "2026-04-28 10:30 AM",
    },
  ];
  const sellerCommission = [
    {
      header: "SN",
      accessorKey: "sn",
      cell: (row) => <span className="font-medium">{row.sn}</span>,
    },
    {
      header: "Commission",
      accessorKey: "commission",
      cell: (row) => (
        <span className="text-purple-600">Rs {row.commission}</span>
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
      cell: (row) => <span className="font-semibold">Rs {row.totalPrice}</span>,
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: (row) => <span>{row.customer}</span>,
    },
    {
      header: "Seller",
      accessorKey: "seller",
      cell: (row) => <span>{row.seller}</span>,
    },
    {
      header: "Time & Date",
      accessorKey: "datetime",
      cell: (row) => <span>{row.datetime}</span>,
    },
  ];
  return (
    <>
      <div className=" space-y-8">
        <PageHeader text="Seller Commission" />
        <DataTable data={commissionData} columns={sellerCommission} />
      </div>
    </>
  );
};

export default SellerCommission;
