import React, { useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import { FileWarning } from "lucide-react";
import FormModal from "../../../components/FormModal";
import ConfirmModal from "../../../components/ConfirmModal";
import {
  getMyBankDetailAPI,
  upsertBankDetailAPI,
} from "../../../services/userPayment/userPayment.api";
import {
  getAvailableBalanceAPI,
  getMyWithdrawalsAPI,
  submitWithdrawalAPI,
} from "../../../services/userFund/userFund.api";
import { showSuccess } from "../../../utils/toast";

const Fund = () => {
  const [bankDetail, setBankDetail] = useState(null);
  const [isBank, setIsBank] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const [availableBalance, setAvailableBalance] = useState(0);
  const [fundData, setFundData] = useState([]);
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");

  // const fundData = [
  //   {
  //     _id: 101,
  //     sn: 1,
  //     withdrawAmount: 100,
  //     status: "pending",
  //     datetime: "2026-04-24 10:30 AM",
  //   },
  //   {
  //     _id: 102,
  //     sn: 2,
  //     withdrawAmount: 500,
  //     status: "approved",
  //     datetime: "2026-04-24 11:15 AM",
  //   },
  // ];

  const fundColumns = [
    { header: "SN", accessorKey: "sn" },

    {
      header: "Withdraw Amount",
      accessorKey: "amount",
      cell: (row) => (
        <span className="font-semibold text-gray-800">Rs {row.amount}</span>
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

  const fetchBalance = async () => {
    try {
      const data = await getAvailableBalanceAPI();
      console.log(data);
      setAvailableBalance(data.availableBalance);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const data = await getMyWithdrawalsAPI();
      console.log(data);
      const formatted = data.withdrawals.map((item, index) => ({
        sn: index + 1,
        _id: item._id,
        amount: item.amount,
        status: item.status,
        datetime: new Date(item.createdAt).toLocaleString(),
      }));
      setFundData(formatted);
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    const getMyBankDetail = async () => {
      try {
        const data = await getMyBankDetailAPI();
        console.log(data);
        if (data.bankDetail) {
          setBankDetail(data.bankDetail);
          setIsBank(true);
        }
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    getMyBankDetail();
    fetchBalance();
    fetchWithdrawals();
  }, []);

  const handleBankSubmit = async (data) => {
    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("bankName", data.bankName);
      formData.append("fullName", data.fullName);
      formData.append("accountNumber", data.accountNumber);
      if (data.qr) formData.append("qr", data.qr);

      const response = await upsertBankDetailAPI(formData);

      setBankDetail(response.bankDetail);
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

  const handleWithdrawConfirm = async () => {
    setWithdrawing(true);
    setWithdrawError("");
    try {
      const data = await submitWithdrawalAPI(availableBalance);
      await fetchBalance();
      await fetchWithdrawals();
      setWithdraw(false);
      showSuccess(data.message);
    } catch (error) {
      setWithdrawError(
        error.response?.data?.message ?? "Failed to submit withdrawal request.",
      );
    } finally {
      setWithdrawing(false);
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
                  <img
                    src={bankDetail?.qrUrl}
                    alt=""
                    height={100}
                    width={100}
                  />
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
            <h2 className="text-xl font-bold text-gray-800">
              Rs {availableBalance}
            </h2>
          </div>
          <button
            onClick={() => setWithdraw(true)}
            disabled={availableBalance <= 0}
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
              message={`Request withdrawal of Rs ${availableBalance}? ${
                withdrawError ? withdrawError : ""
              }`}
              confirmText="Yes"
              cancelText="No"
              loading={withdrawing}
              onConfirm={handleWithdrawConfirm}
              onCancel={() => setWithdraw(false)}
            />
          )}
        </>
      )}
    </>
  );
};

export default Fund;
