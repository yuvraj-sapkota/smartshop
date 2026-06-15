import React from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import useOrderStore from "../../../store/orderStore/orderStore";
import { useEffect } from "react";

const flattenSales = (orders) => {
  const rows = [];

  orders.forEach((order) => {
    order.items.forEach((item) => {
      rows.push({
        _id: `${order._id}-${item._id}`,
        sn: rows.length + 1,
        product: item.product?.name || item.productName || "Custom Product",
        quantity: item.qty,
        price: item.price,
        totalPrice: item.qty * item.price,
        commission: item.qty * item.commission,
        seller: order.seller?.username || "-",
        customer: order.customer?.username || "-",
        datetime: new Date(order.createdAt).toLocaleString(),
      });
    });
  });

  return rows;
};

const SalesHistory = () => {
  const orders = useOrderStore((state) => state.orders);
  const getAllOrders = useOrderStore((state) => state.getAllOrders);
  const loading = useOrderStore((state) => state.loading);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  console.log(orders);
  const salesData = flattenSales(orders);

  // const salesData = [
  //   {
  //     _id: 1,
  //     sn: 1,
  //     product: "Pen",
  //     quantity: 2,
  //     price: 20,
  //     totalPrice: 40,
  //     commission: 5,
  //     seller: "Ram Store",
  //     customer: "John",
  //     datetime: "2026-04-28 10:00 AM",
  //   },
  //   {
  //     _id: 2,
  //     sn: 2,
  //     product: "Pen",
  //     quantity: 2,
  //     price: 20,
  //     totalPrice: 40,
  //     commission: 5,
  //     seller: "Ram Store",
  //     customer: "John",
  //     datetime: "2026-04-28 10:00 AM",
  //   },
  // ];
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
