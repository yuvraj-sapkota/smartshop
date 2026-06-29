import React, { useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import { FileWarning } from "lucide-react";
import FormModal from "../../../components/FormModal";
import ConfirmModal from "../../../components/ConfirmModal";
import {
  getMyBankDetailAPI,
  upsertBankDetailAPI,
} from "../../../services/userPayment/userPayment.api";

const Fund = () => {
  const [bankDetail, setBankDetail] = useState(null);
  const [isBank, setIsBank] = useState(false);
  // const isBank = Boolean(bankDetail);
  const [withdraw, setWithdraw] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  const bankFields = [
    {
      name: "bankName",
      type: "text",
      placeholder: "Bank Name / esewa",
      label: "Enter Bank Name",
    },
    {
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
      label: "Enter Account Holder's Name",
    },
    {
      name: "accountNumber",
      type: "text",
      placeholder: "Account Number ",
      label: "Enter Account Number",
    },

    {
      name: "qr",
      type: "file",
      label: "upload Qr code",
    },
  ];

  useEffect(() => {
    const getMyBankDetail = async () => {
      try {
        const data = await getMyBankDetailAPI();
        console.log(await getMyBankDetailAPI());
        if (data.bankDetail) {
          setBankDetail(data.bankDetail);
          setIsBank(true);
        }
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    getMyBankDetail();
  }, []);

  const handleBankSubmit = async (data) => {
    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("bankName", data.bankName);
      formData.append("fullName", data.fullName);
      formData.append("accountNumber", data.accountNumber);
      if (data.qr?.[0]) formData.append("qr", data.qr[0]);

      const response = await upsertBankDetailAPI(formData);

      setBankDetail(response.data.bankDetail);
      setIsBank(true);
      setOpen(false);
    } catch (error) {
      setError(
        error.response?.data?.message ??
          "Failed to save bank details. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="space-y-10">
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

        {isBank ? (
          <div>
            <h2 className="font-semibold text-lg mb-3 text-gray-700">
              Bank Details
            </h2>
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
              <div className=" text-gray-600 space-y-2">
                <p className="">
                  <span className="font-semibold">Bank:</span>{" "}
                  {bankDetail?.bankName}
                </p>
                <p className="">
                  <span className="font-semibold">Name:</span>{" "}
                  {bankDetail?.fullName}
                </p>
                <p>
                  <span>Account:</span> {bankDetail?.accountNumber}
                </p>

                <div>
                  <p>Qr code:</p>
                  <img src={bankDetail?.qrUrl} alt="" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
            <p className="text-sm flex items-center gap-2">
              <FileWarning size={24} /> You must setup your bank details before
              making a withdrawal.
            </p>
          </div>
        )}

        {/* Available Balance  */}
        <div className="flex justify-between items-center bg-white shadow-md border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Available Balance</p>
            <h2 className="text-xl font-bold text-gray-800">Rs 100</h2>
          </div>
          <button
            onClick={() => setWithdraw(true)}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-hover transition"
          >
            withdraw
          </button>
        </div>

        {/* withdrawal history  */}
        <div>
          <h1 className="font-semibold text-lg text-gray-700 mb-3">
            Withdrawal History
          </h1>

          <DataTable columns={fundColumns} data={fundData} />
        </div>
      </div>

      {/* modal  */}
      {open && (
        <FormModal
          open={open}
          setOpen={setOpen}
          fields={bankFields}
          title="Payment Details"
          btnText={submitting ? "Saving..." : "Submit"}
          onSubmit={handleBankSubmit}
          error={error}
        />
      )}

      {withdraw && (
        <>
          {!isBank ? (
            <ConfirmModal
              isOpen={withdraw}
              title="Missing Information"
              message="Please setup your bank details"
              confirmText="ok"
              cancelText="cancle"
              onConfirm={() => setWithdraw(false)}
              onCancel={() => setWithdraw(false)}
            />
          ) : (
            <ConfirmModal
              isOpen={withdraw}
              title="Withdrawl"
              message="Request for withdrawl? "
              confirmText="Yes"
              cancelText="No"
              onCancel={() => setWithdraw(false)}
            />
          )}
        </>
      )}
    </>
  );
};

export default Fund;
