import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import useOrderStore from "../../../store/orderStore/orderStore";

const REFERRAL_COMMISSION_RATE = 0.1; // 10%
const CASHBACK_RATE = 0.25; // 25%

const UserCommission = () => {
  const { orders, getAllOrders } = useOrderStore();
  const [active, setActive] = useState("reward");

  useEffect(() => {
    getAllOrders();
  }, []);

  const rewardData = [];

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const product = item.product?.name || item.productName;
      const itemCommission = item.commission * item.qty;
      const base = {
        product,
        quantity: item.qty,
        price: item.price,
        totalPrice: item.price * item.qty,
        seller: order.seller.username,
        buyer: order.customer.username,
        datetime: new Date(order.createdAt).toLocaleString(),
      };

      // Cashback — buyer earns from their own purchase
      rewardData.push({
        _id: `${item._id}-cashback`,
        ...base,
        reward: parseFloat((itemCommission * CASHBACK_RATE).toFixed(2)),
        earnBy: order.customer.username,
        type: "cashback",
      });

      // Referral reward — whoever referred the seller
      if (order.seller.referredBy) {
        rewardData.push({
          _id: `${item._id}-sellerRef`,
          ...base,
          reward: parseFloat(
            (itemCommission * REFERRAL_COMMISSION_RATE).toFixed(2),
          ),
          earnBy: order.seller.referredBy.username,
          type: "reward",
        });
      }

      // Referral reward — whoever referred the buyer
      if (order.customer.referredBy) {
        rewardData.push({
          _id: `${item._id}-buyerRef`,
          ...base,
          reward: parseFloat(
            (itemCommission * REFERRAL_COMMISSION_RATE).toFixed(2),
          ),
          earnBy: order.customer.referredBy.username,
          type: "reward",
        });
      }
    });
  });

  const formattedRewardData = rewardData.map((item, index) => ({
    ...item,
    sn: index + 1,
  }));

  const rewardColumns = [
    {
      header: "SN",
      accessorKey: "sn",
      cell: (row) => <span className="font-medium">{row.sn}</span>,
    },
    {
      header: active === "cashback" ? "Cashback" : "Reward",
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
      header: "Seller",
      accessorKey: "seller",
      cell: (row) => <span>{row.seller}</span>,
    },
    {
      header: "Buyer",
      accessorKey: "buyer",
      cell: (row) => <span>{row.buyer}</span>,
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

  const rewardRows = rewardData
    .filter((r) => r.type === "reward")
    .map((item, index) => ({ ...item, sn: index + 1 }));

  const cashbackRows = rewardData
    .filter((r) => r.type === "cashback")
    .map((item, index) => ({ ...item, sn: index + 1 }));

  return (
    <>
      <div className="space-y-10 ">
        <PageHeader text="User Commmission" />

        <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 shadow-sm mb-4">
          <button
            onClick={() => setActive("reward")}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              active === "reward" ? "bg-primary text-white " : ""
            }`}
          >
            Reward
          </button>

          <button
            onClick={() => setActive("cashback")}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              active === "cashback" ? "bg-primary text-white" : ""
            }`}
          >
            Cashback
          </button>
        </div>

        <DataTable
          data={active === "reward" ? rewardRows : cashbackRows}
          columns={rewardColumns}
        />
      </div>
    </>
  );
};

export default UserCommission;
