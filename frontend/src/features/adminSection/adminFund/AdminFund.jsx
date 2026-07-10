import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import {
  getAllSubmitPaymentAPI,
  updatePaymentStatus,
} from "../../../services/sellerPayment/sellerPayment.api";
import {
  getAllWithdrawalsAPI,
  updateWithdrawalStatusAPI,
} from "../../../services/userFund/userFund.api";

const AdminFund = () => {
  const [active, setActive] = useState("seller");

  const [sellerTransactions, setSellerTransactions] = useState([]);
  const [userWithdrawals, setUserWithdrawals] = useState([]);

  const handleSellerStatusChange = async (id, newStatus) => {
    try {
      await updatePaymentStatus(id, newStatus);

      setSellerTransactions((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserStatusChange = async (id, newStatus) => {
    try {
      await updateWithdrawalStatusAPI(id, newStatus);

      setUserWithdrawals((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSellerTransactions = async () => {
      try {
        const data = await getAllSubmitPaymentAPI();
        setSellerTransactions(data.payments);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserWithdrawals = async () => {
      try {
        const data = await getAllWithdrawalsAPI();
        setUserWithdrawals(data.withdrawals);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSellerTransactions();
    fetchUserWithdrawals();
  }, []);

  const formattedSellerTransactions = sellerTransactions.map((item, index) => ({
    ...item,
    sn: index + 1,
  }));

  const formattedUserWithdrawals = userWithdrawals.map((item, index) => ({
    ...item,
    sn: index + 1,
    username: item.user?.username,
  }));

  const sellerTransactionColumns = [
    { header: "SN", accessorKey: "sn" },

    {
      header: "Amount",
      accessorKey: "amount",
      cell: (row) => (
        <span className="font-semibold text-gray-800">Rs {row.amount}</span>
      ),
    },

    {
      header: "Type",
      accessorKey: "type",
      cell: (row) => (
        <span className="capitalize text-blue-600 font-medium">Deposite</span>
      ),
    },

    {
      header: "Seller or User",
      accessorKey: "seller",
      cell: (row) => row.seller?.storeName,
    },

    {
      header: "Bank Name",
      accessorKey: "bankName",
    },

    {
      header: "Account Name",
      accessorKey: "accountName",
    },

    {
      header: "Account Number",
      accessorKey: "accountNumber",
    },

    {
      header: "Screenshot",
      accessorKey: "screenshotUrl",
      cell: (row) => (
        <img
          src={row.screenshotUrl}
          alt="screenshot"
          className="w-12 h-12 object-cover rounded "
        />
      ),
    },
    {
      header: "Screenshot Time",
      accessorKey: "screenshotTime",
      cell: (row) => (
        <span className="text-gray-500 text-xs whitespace-nowrap">
          {row.screenshotTime}
        </span>
      ),
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const color =
          row.status === "pending"
            ? "text-yellow-600 bg-yellow-100"
            : row.status === "approved"
            ? "text-green-600 bg-green-100"
            : "text-red-600 bg-red-100";

        return row.status === "pending" ? (
          <select
            defaultValue={row.status}
            onChange={(e) => handleSellerStatusChange(row._id, e.target.value)}
            className={` px-2 py-1 rounded-full text-xs font-semibold bg-transparent outline-none ${color}`}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        ) : (
          <span
            className={` capitalize px-2 py-1 rounded-full text-xs font-semibold  ${color}`}
          >
            {row.status}
          </span>
        );
      },
    },

    {
      header: "Time & Date",
      accessorKey: "datetime",
      cell: (row) => (
        <span className="text-gray-500 text-xs whitespace-nowrap">
          {new Date(row.createdAt).toLocaleString()}
        </span>
      ),
    },
  ];

  const userWithdrawalColumns = [
    {
      header: "SN",
      accessorKey: "sn",
    },

    {
      header: "Username",
      accessorKey: "username",
      cell: (row) => (
        <span className="font-medium text-gray-800">{row.username}</span>
      ),
    },

    {
      header: "Withdraw Amount",
      accessorKey: "amount",
      cell: (row) => (
        <span className="font-semibold text-red-600">Rs {row.amount}</span>
      ),
    },
    {
      header: "Bank",
      accessorKey: "bank",
      cell: (row) => (
        <button
          onClick={() => alert("comming soon")}
          className="px-2 py-2 text-xs font-medium text-white bg-primary rounded-md hover:opacity-90 transition"
        >
          View Bank
        </button>
      ),
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const color =
          row.status === "pending"
            ? "text-yellow-600 bg-yellow-100"
            : row.status === "approved"
            ? "text-green-600 bg-green-100"
            : "text-red-600 bg-red-100";

        return row.status === "pending" ? (
          <select
            defaultValue={row.status}
            onChange={(e) => handleUserStatusChange(row._id, e.target.value)}
            className={` px-2 py-1 rounded-full text-xs font-semibold bg-transparent outline-none ${color}`}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        ) : (
          <span
            className={` capitalize px-2 py-1 rounded-full text-xs font-semibold  ${color}`}
          >
            {row.status}
          </span>
        );
      },
    },

    {
      header: "Time & Date",
      accessorKey: "createdAt",
      cell: (row) => (
        <span className="text-gray-500 text-xs whitespace-nowrap">
          {new Date(row.createdAt).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-10">
        <div className="flex items-center justify-between ">
          <PageHeader text="Fund Management" />
        </div>

        {/* admin bank details  */}
        <div>
          <h2 className="font-semibold text-lg mb-3 text-gray-700">
            Admin Bank Details
          </h2>
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
            <div className=" text-gray-600 space-y-2">
              <p className="">
                <span className="font-semibold">Bank:</span> Nepal Bank
                Development
              </p>
              <p className="">
                <span className="font-semibold">Name:</span> Ram Prasad Poudel
              </p>
              <p>
                <span>Account:</span> 000208987654321
              </p>
            </div>
          </div>
        </div>

        {/* transaction overview */}
        <div>
          <h2 className="font-semibold text-lg mb-3 text-gray-700">
            Transactions Overview
          </h2>

          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
            <div className="flex justify-between items-center">
              {/* Pending Deposit */}
              <div>
                <p className="text-gray-500 text-sm">Pending Deposit</p>
                <h3 className="text-lg font-semibold text-green-600">
                  Rs. 100
                </h3>
              </div>

              {/* Pending Withdraw */}
              <div className="text-right">
                <p className="text-gray-500 text-sm">Pending Withdraw</p>
                <h3 className="text-lg font-semibold text-red-600">Rs. 200</h3>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4 text-gray-700">
            Transactions Flow
          </h2>

          <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 shadow-sm mb-4">
            <button
              onClick={() => setActive("seller")}
              className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                active == "seller" ? "bg-primary text-white " : ""
              }`}
            >
              Seller Fund
            </button>

            <button
              onClick={() => setActive("user")}
              className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                active == "user" ? "bg-primary text-white" : ""
              }`}
            >
              User Fund
            </button>
          </div>

          {active == "seller" ? (
            <DataTable
              columns={sellerTransactionColumns}
              data={formattedSellerTransactions}
            />
          ) : (
            <DataTable
              columns={userWithdrawalColumns}
              data={formattedUserWithdrawals}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminFund;