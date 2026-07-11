import React, { useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import useOrderStore from "../../../store/orderStore/orderStore";

const SellerCommission = () => {
  const { orders, getAllOrders } = useOrderStore();

  useEffect(() => {
    getAllOrders();
  }, []);

  // flatten each order's items into individual rows
  const commissionData = [];
  orders.forEach((order) => {
    order.items.forEach((item) => {
      commissionData.push({
        _id: item._id,
        commission: item.commission * item.qty,
        product: item.product?.name || item.productName,
        quantity: item.qty,
        price: item.price,
        totalPrice: item.price * item.qty,
        customer: order.customer?.username,
        seller: order.seller?.username,
        datetime: new Date(order.createdAt).toLocaleString(),
      });
    });
  });

  const formattedData = commissionData.map((item, index) => ({
    ...item,
    sn: index + 1,
  }));

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
        <DataTable data={formattedData} columns={sellerCommission} />
      </div>
    </>
  );
};

export default SellerCommission;
