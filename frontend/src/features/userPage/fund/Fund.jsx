import React, { useState } from "react";
import DataTable from "../../../components/DataTable";
import BankModal from "./fundComponents/BankModal";
import { FileWarning } from "lucide-react";

const Fund = () => {
  const [open, setOpen] = useState(false);
  const fundData = [
    {
      _id: 101,
      sn: 1,
      withdrawAmount: 100,
      status: "pending",
      datetime: "2026-04-24 10:30 AM",
    },
    {
      _id: 102,
      sn: 2,
      withdrawAmount: 500,
      status: "approved",
      datetime: "2026-04-24 11:15 AM",
    },
  ];

  const fundColumns = [
    { header: "SN", accessorKey: "sn" },

    {
      header: "Withdraw Amount",
      accessorKey: "withdrawAmount",
      cell: (row) => (
        <span className="font-semibold text-gray-800">
          Rs {row.withdrawAmount}
        </span>
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

        return <span className={`font-semibold ${color}`}>{row.status}</span>;
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
        {/* bank details setup garna ko lagi auta button rakhna paryo yaha */}

        <div className="flex items-center justify-between ">
          <h1 className="font-bold text-xl md:text-2xl text-primary ">
            Fund Management
          </h1>
          <button
            onClick={() => setOpen(true)}
            className="bg-white text-primary border border-primary px-5 py-2 rounded-lg hover:bg-primary hover:text-white transition cursor-pointer"
          >
            Setup Bank Details
          </button>
        </div>

        {/* warning section  */}
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
          <p className="text-sm flex items-center gap-2">
            <FileWarning size={24} /> You must setup your bank details before
            making a withdrawal.
          </p>
        </div>

        {/* user bank details  */}

        <div>
          <h2 className="font-semibold text-lg mb-3 text-gray-700">
            Bank Details
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

        <div className="flex justify-between items-center bg-white shadow-md border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Available Balance</p>
            <h2 className="text-xl font-bold text-gray-800">Rs 100</h2>
          </div>
          <button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-hover transition">
            withdraw
          </button>
        </div>

        <div>
          <h1 className="font-semibold text-lg text-gray-700 mb-3">
            Withdrawal History
          </h1>

          <DataTable columns={fundColumns} data={fundData} />
        </div>
      </div>

      {open && <BankModal open={open} setOpen={setOpen} />}
    </>
  );
};

export default Fund;
