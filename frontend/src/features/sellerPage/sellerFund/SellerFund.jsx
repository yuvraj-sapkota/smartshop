import React, { useState } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import ImagePreview from "../../../components/ImagePreview";
import FormModal from "../../../components/FormModal";

const SellerFund = () => {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const depositData = [
    {
      _id: 201,
      sn: 1,
      depositAmount: 100,
      bankName: "eSewa",
      accountName: "Ishor",
      accountNumber: "1234567",
      status: "approved",
      datetime: "2026-04-24 10:00 PM",
      screenshot:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvpyxhKPgXyZgDQAbvYj21z01wh40m07kwQ&s",
    },
  ];
  const depositColumns = [
    { header: "SN", accessorKey: "sn" },

    {
      header: "Deposit Amount",
      accessorKey: "depositAmount",
      cell: (row) => (
        <span className="font-semibold text-gray-800">
          Rs {row.depositAmount}
        </span>
      ),
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
      cell: (row) => <span className="text-gray-700">{row.accountNumber}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full  font-semibold ${
            row.status === "rejected"
              ? "bg-red-100 text-red-600"
              : row.status === "approved"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {row.status}
        </span>
      ),
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

    {
      header: "Screenshot",
      accessorKey: "screenshot",
      cell: (row) => (
        <img
          src={row.screenshot}
          alt="payment proof"
          onClick={() => setPreviewImage(row.screenshot)}
          className="w-12 h-12 object-cover rounded-md "
        />
      ),
    },
  ];

  const sellerFields = [
    {
      name: "amount",
      type: "number",
      placeholder: "Amount",
      label: "Enter Amount",
    },
    {
      name: "bankName",
      type: "text",
      placeholder: "Bank Name / esewa",
      label: "Enter Bank Name",
    },

    {
      name: "accountNumber",
      type: "text",
      placeholder: "Account Number ",
      label: "Enter Account Number",
    },
    {
      name: "accountName",
      type: "text",
      placeholder: "Account Name ",
      label: "Enter Account Name",
    },
    {
      name: "time",
      type: "text",
      placeholder: "screenshot time ",
      label: "Enter screenshot time ",
    },
    {
      name: "screenshot",
      type: "file",
      placeholder: "Screenshot",
      label: "Upload Screenshot",
    },
  ];
  return (
    <>
      <div className="space-y-8 ">
        <div className="flex items-center justify-between">
          <PageHeader text="Fund Management" />
        </div>

        {/* Admin's Bank details  */}
        <div>
          <h2 className="font-semibold text-lg mb-3 text-gray-700">
            Admin's Bank Details
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

        {/* Due Amount  */}
        <div className="flex justify-between items-center bg-white shadow-md border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Due Amount</p>
            <h2 className="text-xl font-bold text-gray-800">Rs 100</h2>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-hover transition"
          >
            Pay due
          </button>
        </div>

        {/* payment History  */}
        <div>
          <h1 className="font-semibold text-lg text-gray-700 mb-3">
            Payment History
          </h1>
          
          <DataTable columns={depositColumns} data={depositData} />
        </div>
      </div>

      {/* image ma click garda image thulo huni  */}
      {/* <ImagePreview
        image={previewImage}
        onClose={() => setPreviewImage(null)}
      /> */}

      {open && (
        <FormModal
          open={open}
          setOpen={setOpen}
          fields={sellerFields}
          title="Payment Details"
          btnText="Submit"
          onSubmit={(data) => console.log(data)}
        />
      )}
    </>
  );
};

export default SellerFund;
