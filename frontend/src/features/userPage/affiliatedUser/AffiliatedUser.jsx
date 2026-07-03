import React, { useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import { getMyReferralsAPI } from "../../../services/referrals/referrals.api";

const AffiliatedUser = () => {
  // const [data, setData] = useState([]);
  const [referralData, setReferralData] = useState([]);
  const [active, setActive] = useState("seller");

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const data = await getMyReferralsAPI();
      console.log("data is", data);

      const formattedData = data.referrals.map((user, index) => ({
        sn: index + 1,
        _id: user._id,
        store: user.storeName || "-",
        name: user.username,
        totalSales: 0,
        datetime: new Date(user.createdAt).toLocaleString(),
      }));

      setReferralData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const sellerColumns = [
    {
      header: "SN",
      accessorKey: "sn",
    },
    {
      header: "Store Name",
      accessorKey: "store",
      cell: (row) => (
        <span className="font-medium text-gray-800">{row.store}</span>
      ),
    },
    {
      header: "Total Sales ",
      accessorKey: "totalSales",
      cell: (row) => (
        <span className="font-semibold text-gray-800">Rs {row.totalSales}</span>
      ),
    },
    {
      header: "Date & Time",
      accessorKey: "datetime",
      cell: (row) => (
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {row.datetime}
        </span>
      ),
    },
  ];
  const userColumns = [
    {
      header: "SN",
      accessorKey: "sn",
    },
    {
      header: "User Name",
      accessorKey: "name",
      cell: (row) => (
        <span className="font-medium text-gray-800">{row.name}</span>
      ),
    },
    {
      header: "Total Purchased",
      accessorKey: "totalSales",
      cell: (row) => (
        <span className="font-semibold text-gray-800">Rs {row.totalSales}</span>
      ),
    },
    {
      header: "Date & Time",
      accessorKey: "datetime",
      cell: (row) => (
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {row.datetime}
        </span>
      ),
    },
  ];

  return (
    <>
      <h1 className="mb-4 text-xl font-bold text-primary md:text-2xl">
        Affiliated Users
      </h1>

      <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 shadow-sm mb-4">
        <button
          onClick={() => setActive("seller")}
          className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            active == "seller" ? "bg-primary text-white " : ""
          }`}
        >
          Seller 
        </button>

        <button
          onClick={() => setActive("user")}
          className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            active == "user" ? "bg-primary text-white" : ""
          }`}
        >
          User 
        </button>
      </div>

      {active === "seller" ? (
        <DataTable columns={sellerColumns} data={referralData} />
      ) : (
        <DataTable columns={userColumns} data={referralData} />
      )}
    </>
  );
};

export default AffiliatedUser;
