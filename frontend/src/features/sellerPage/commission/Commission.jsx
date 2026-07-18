import React from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import useOrderStore from "../../../store/orderStore/orderStore";
import { useEffect } from "react";
import { useMemo } from "react";

const Commission = () => {
  const orders = useOrderStore((state) => state.orders);
  const loading = useOrderStore((state) => state.loading);
  const getMyOrders = useOrderStore((state) => state.getMyOrders);

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  const data = useMemo(() => {
    return orders.flatMap((order, orderIndex) =>
      order.items.map((item, itemIndex) => ({
        _id: `${order._id}-${itemIndex}`,
        sn: itemIndex + 1,
        commission: item.qty * item.commission,
        product: item.productName || item.product?.name,
        price: item.price,
        qty: item.qty,
        totalPrice: item.qty * item.price,
        buyer: order.customer.username,
        time: new Date(order.createdAt).toLocaleString(),
      })),
    );
  }, [orders]);

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
      header: "Product",
      accessorKey: "product",
      cell: (row) => (
        <div className="font-medium text-gray-800">{row.product}</div>
      ),
    },

    {
      header: "Price",
      accessorKey: "price",
      cell: (row) => <span>Rs {row.price}</span>,
    },

    { header: "Qty", accessorKey: "qty" },
    {
      header: "Total Price",
      accessorKey: "totalPrice",
      cell: (row) => <span>Rs {row.totalPrice}</span>,
    },

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

        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
};

export default Commission;
