import React from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";

const AdminFund = () => {
  const transactionData = [
    {
      _id: 1,
      sn: 1,
      amount: 100,
      type: "deposit",
      seller: "Ram Store",
      bankName: "Nepal Bank",
      accountName: "Ram Prasad",
      accountNumber: "0098076473",
      screenshot:
        "https://storage.googleapis.com/support-forums-api/attachment/thread-191661601-15203805108075818741.JPG", // image path or url
      status: "pending",
      datetime: "2026-04-24 10:30 AM",
    },
    {
      _id: 1,
      sn: 2,
      amount: 100,
      type: "deposit",
      seller: "Ram Store",
      bankName: "Nepal Bank",
      accountName: "Ram Prasad",
      accountNumber: "0098076473",
      screenshot:
        "https://storage.googleapis.com/support-forums-api/attachment/thread-191661601-15203805108075818741.JPG", // image path or url
      status: "approved",
      datetime: "2026-04-24 10:30 AM",
    },
  ];

  const transactionColumns = [
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
        <span className="capitalize text-blue-600 font-medium">{row.type}</span>
      ),
    },

    {
      header: "Seller",
      accessorKey: "seller",
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
      accessorKey: "screenshot",
      cell: (row) => (
        <img
          src={row.screenshot}
          alt="screenshot"
          className="w-12 h-12 object-cover rounded "
        />
      ),
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const color =
          row.status === "pending"
            ? "text-yellow-600"
            : row.status === "approved"
            ? "text-green-600"
            : "text-red-600";

        return (
          <select
            defaultValue={row.status}
            className={`text-sm font-semibold bg-transparent outline-none ${color}`}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="reject">Reject</option>
          </select>
        );
      },
    },

    {
      header: "Time & Date",
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
      <div className="space-y-10">
        <div className="flex items-center justify-between ">
          <PageHeader text="Fund Management" />
          <button
            onClick={() => setOpen(true)}
            className="bg-white text-primary border border-primary px-5 py-2 rounded-lg hover:bg-primary hover:text-white transition cursor-pointer"
          >
            Setup Bank Details
          </button>
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
              {/* 
            {bankDetails.qr && (
              <img
                src={URL.createObjectURL(bankDetails.qr)}
                alt="QR"
                className="w-24 mt-2 rounded"
              />
            )} */}
            </div>
          </div>
        </div>

        {/* Pending Section */}
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
          <h2 className="font-semibold text-lg mb-3 text-gray-700">
            Transactions Flow
          </h2>

          <DataTable columns={transactionColumns} data={transactionData} />
        </div>
      </div>
    </>
  );
};

export default AdminFund;
