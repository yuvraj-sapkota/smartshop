import React from "react";
import DataTable from "../../../components/DataTable";
import { useState } from "react";
import { useEffect } from "react";
import { getMyRewardsAPI } from "../../../services/referrals/referrals.api";

const Reward = () => {
  const [rewardData, setRewardData] = useState([]);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const data = await getMyRewardsAPI();
      console.log(data);
      const formattedData = data.rewards.map((item, index) => ({
        sn: index + 1,
        ...item,
        datetime: new Date(item.datetime).toLocaleString(),
      }));
      setRewardData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { header: "SN", accessorKey: "sn" },

    {
      header: "Reward",
      accessorKey: "reward",
      cell: (row) => (
        <span className="text-gray-800 font-semibold">{row.reward}</span>
      ),
    },

    {
      header: "Product",
      accessorKey: "product",
      cell: (row) => (
        <span className="font-medium text-gray-800">{row.product}</span>
      ),
    },

    { header: "Qty", accessorKey: "quantity" },

    {
      header: "MRP",
      accessorKey: "mrp",
      cell: (row) => <span className="text-gray-800">Rs {row.mrp}</span>,
    },
    {
      header: "Total Price",
      accessorKey: "totalPrice",
      cell: (row) => (
        <span className="text-gray-800 font-medium">Rs {row.totalPrice}</span>
      ),
    },

    {
      header: "Seller",
      accessorKey: "seller",
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-sm  `}>{row.seller}</span>
      ),
    },
    {
      header: "Buyer",
      accessorKey: "buyer",
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-sm  `}>{row.buyer}</span>
      ),
    },

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

  // const data = [
  //   {
  //     _id: 101,
  //     sn: 1,
  //     reward: 20,
  //     product: "Pen",
  //     quantity: 2,
  //     mrp: 200,
  //     seller: "Ram",
  //     buyer: "john",
  //     rewardType: "Cashback",
  //     datetime: "2026-04-23 10:30 AM",
  //   },
  //   {
  //     _id: 102,
  //     sn: 1,
  //     reward: 20,
  //     product: "Pen",
  //     quantity: 2,
  //     mrp: 200,
  //     totalPrice: 400,
  //     seller: "shyam",
  //     buyer: "rai",
  //     datetime: "2026-04-23 10:30 AM",
  //   },
  //   {
  //     _id: 103,
  //     sn: 1,
  //     reward: 20,
  //     product: "Pen",
  //     quantity: 2,
  //     mrp: 200,
  //     totalPrice: 400,
  //     seller: "rabi",
  //     buyer: "sita",
  //     datetime: "2026-04-23 10:30 AM",
  //   },
  // ];

  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl text-primary mb-4">
        Reward
      </h1>
      <DataTable columns={columns} data={rewardData} />
    </>
  );
};

export default Reward;
