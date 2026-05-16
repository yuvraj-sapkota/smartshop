import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllSellers } from "../../../services/seller/seller.api";

const Sellers = () => {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);

  const storeData = sellers.map((item, index) => ({
    _id: item._id,
    sn: index + 1,
    store: item.storeName,

    username: item.username,
    needToPay: "",
    status: item.sellerStatus,
    refer: item.referBy || "--",
    datetime: new Date(item.createdAt).toLocaleString(),
  }));

  const storeColumns = [
    {
      header: "Store",
      accessorKey: "store",
      cell: (row) => (
        <span className="font-semibold text-gray-800">{row.store}</span>
      ),
    },

    { header: "SN", accessorKey: "sn" },

    {
      header: "Username",
      accessorKey: "username",
    },

    {
      header: "Need to Pay",
      accessorKey: "needToPay",
      cell: (row) =>
        row.status === "approved" && row.needToPay ? (
          <span className="text-blue-600 font-semibold">
            Rs {row.needToPay}
          </span>
        ) : (
          <span className="text-gray-400">--</span>
        ),
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const color =
          row.status === "approved"
            ? "text-green-600"
            : row.status === "rejected"
            ? "text-red-600"
            : "text-yellow-600";

        return (
          <span className={`font-semibold capitalize ${color}`}>
            {row.status}
          </span>
        );
      },
    },

    {
      header: "Refer",
      accessorKey: "refer",
    },

    {
      header: "Time",
      accessorKey: "datetime",
      cell: (row) => (
        <span className="text-gray-500 text-xs whitespace-nowrap">
          {row.datetime}
        </span>
      ),
    },

    {
      header: "Actions",
      accessorKey: "actions",
      cell: (row) => (
        <button
          onClick={() => navigate(`/admin/seller-detail/${row._id}`)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition text-gray-700"
        >
          <Eye size={13} />
          View
        </button>
      ),
    },
  ];

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const data = await getAllSellers();
        setSellers(data.sellers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSeller();
  }, []);
  return (
    <>
      <div className="space-y-10">
        <PageHeader text="Sellers" />
        <DataTable data={storeData} columns={storeColumns} />
      </div>
    </>
  );
};

export default Sellers;
