import React, { useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import useProductStore from "../../../store/productStore/productStore";
import useOrderStore from "../../../store/orderStore/orderStore";
import CreateSalesModal from "./createOrderComponents/CreateSalesModal";
import { useState } from "react";

const columns = [
  {
    header: "SN",
    cell: (_, index) => (
      <span className="text-gray-500 text-sm">{index + 1}</span>
    ),
  },
  {
    header: "Product",
    cell: (row) => (
      <div className="font-medium text-gray-800">{row.product}</div>
    ),
  },
  { header: "Qty", accessorKey: "qty" },
  {
    header: "Price",
    cell: (row) => <span>Rs. {row.price.toLocaleString()}</span>,
  },
  {
    header: "Total Price",
    cell: (row) => (
      <span className="font-medium">Rs. {row.totalPrice.toLocaleString()}</span>
    ),
  },
  {
    header: "Buyer",
    cell: (row) => (
      <span className="font-semibold text-gray-700">{row.buyer}</span>
    ),
  },
  {
    header: "Commission",
    cell: (row) => (
      <span className="text-purple-600 font-medium">
        Rs. {row.commission.toLocaleString()}
      </span>
    ),
  },
  {
    header: "Time",
    cell: (row) => (
      <span className="text-gray-500 text-xs whitespace-nowrap">{row.time}</span>
    ),
  },
];

const flattenOrders = (orders) => {
  const rows = [];
  orders.forEach((order) => {
    order.items.forEach((item) => {
      const productName =
        item.product?.name || item.productName || "Custom Product";
      rows.push({
        _id: `${order._id}-${item._id}`,
        product: productName,
        qty: item.qty,
        price: item.price,
        totalPrice: item.qty * item.price,
        buyer: order.customer?.username || "-",
        commission: item.qty * item.commission,
        time: new Date(order.createdAt).toLocaleString(),
      });
    });
  });
  return rows;
};

const CreateOrder = () => {
  const products = useProductStore((state) => state.products);
  const getMyProducts = useProductStore((state) => state.getMyProducts);

  const orders = useOrderStore((state) => state.orders);
  const getMyOrders = useOrderStore((state) => state.getMyOrders);
  const loading = useOrderStore((state) => state.loading);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getMyProducts();
    getMyOrders();
  }, [getMyProducts, getMyOrders]);

  

  const tableData = flattenOrders(orders);

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <PageHeader text="Create" />
          <button
            onClick={() => setOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            Create Sales
          </button>
        </div>

        {/* Sales History */}
        <div className="space-y-3">
          <h1 className="font-semibold text-base md:text-lg text-gray-700">
            Sales History
          </h1>
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : (
            <DataTable columns={columns} data={tableData} />
          )}
        </div>
      </div>

      <CreateSalesModal
        open={open}
        onClose={() => setOpen(false)}
        products={products}
      />
    </>
  );
};

export default CreateOrder;