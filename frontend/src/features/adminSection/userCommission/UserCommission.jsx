import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import { getUserCommissionAPI } from "../../../services/order/order.api";
import { showError } from "../../../utils/toast";

const UserCommission = () => {
  const [rewardData, setRewardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("reward");

  useEffect(() => {
    const fetchCommission = async () => {
      try {
        const data = await getUserCommissionAPI();
        setRewardData(data.rewardData);
      } catch (error) {
        showError(
          error.response?.data?.message || "Failed to fetch commission data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCommission();
  }, []);

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
      cell: (row) => <span>{new Date(row.datetime).toLocaleString()}</span>,
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

        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : (
          <DataTable
            data={active === "reward" ? rewardRows : cashbackRows}
            columns={rewardColumns}
          />
        )}
      </div>
    </>
  );
};

export default UserCommission;
