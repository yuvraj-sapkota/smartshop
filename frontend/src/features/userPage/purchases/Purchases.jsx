import { MoveRight } from "lucide-react";
import DataTable from "../../../components/DataTable";
import { useEffect, useState } from "react";
import { getMyPurchasesAPI } from "../../../services/order/order.api";
import { showError } from "../../../utils/toast";

export default function TransactionTable() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await getMyPurchasesAPI();
        setPurchases(data.purchases);
      } catch (error) {
        showError(error.response?.data?.message || "Failed to fetch orders");
      }
    };

    fetchPurchases();
  }, []);

  const data = purchases.map((purchase, index) => ({
    ...purchase,
    sn: index + 1,
  }));

  //   {
  //     _id: 101,
  //     sn: 1,
  //     product: "Product A",
  //     quantity: 2,
  //     totalMrp: 500,
  //     totalPrice: 400,
  //     cashback: 50,
  //     seller: "ABC Store",
  //     datetime: "2026-04-23 10:30 AM",
  //   },
  //   {
  //     _id: 102,
  //     sn: 2,
  //     product: "Product B",
  //     quantity: 1,
  //     totalMrp: 1000,
  //     totalPrice: 400,
  //     cashback: 100,
  //     seller: "XYZ Shop",
  //     datetime: "2026-04-23 12:15 PM",
  //   },
  // ];

  const columns = [
    { header: "SN", accessorKey: "sn" },

    {
      header: "Product",
      accessorKey: "product",
      cell: (row) => (
        <div className="font-medium text-gray-800">{row.product}</div>
      ),
    },

    { header: "Qty", accessorKey: "quantity" },

    {
      header: "MRP",
      accessorKey: "mrp",
      cell: (row) => <span>Rs {row.mrp}</span>,
    },
    {
      header: "Total Price",
      accessorKey: "totalPrice",
      cell: (row) => <span className="font-medium">Rs {row.totalPrice}</span>,
    },

    {
      header: "Cashback",
      accessorKey: "cashback",
      cell: (row) => (
        <span className="text-green-600 font-semibold">+Rs {row.cashback}</span>
      ),
    },

    { header: "Seller", accessorKey: "seller" },

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

  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl text-primary mb-4">
        Purchase
      </h1>
      <DataTable columns={columns} data={data} />
    </>
  );
}
