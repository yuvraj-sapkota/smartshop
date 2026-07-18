import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import {
  getMyBankDetailAPI,
  upsertBankDetailAPI,
  getUserBankDetailAPI,
} from "../../../services/bankDetail/bankDetail.api";
import {
  getAllSubmitPaymentAPI,
  updatePaymentStatus,
} from "../../../services/sellerPayment/sellerPayment.api";
import {
  getAllWithdrawalsAPI,
  updateWithdrawalStatusAPI,
} from "../../../services/userFund/userFund.api";

import { FileWarning } from "lucide-react";
import FormModal from "../../../components/FormModal";

const AdminFund = () => {
  const [active, setActive] = useState("seller");

  const [sellerTransactions, setSellerTransactions] = useState([]);
  const [userWithdrawals, setUserWithdrawals] = useState([]);

  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [bankModalLoading, setBankModalLoading] = useState(false);
  const [bankModalError, setBankModalError] = useState("");
  const [bankModalData, setBankModalData] = useState(null);

  const [bankDetail, setBankDetail] = useState(null);
  const [isBank, setIsBank] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bankFormError, setBankFormError] = useState("");

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

  const handleViewBank = async (userId) => {
    setBankModalOpen(true);
    setBankModalLoading(true);
    setBankModalError("");
    setBankModalData(null);

    try {
      const data = await getUserBankDetailAPI(userId);
      if (data.bankDetail) {
        setBankModalData(data.bankDetail);
      } else {
        setBankModalError("This user hasn't set up their bank details yet.");
      }
    } catch (error) {
      setBankModalError(
        error.response?.data?.message ?? "Failed to load bank details.",
      );
    } finally {
      setBankModalLoading(false);
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

    const fetchMyBankDetail = async () => {
      try {
        const data = await getMyBankDetailAPI();
        if (data.bankDetail) {
          setBankDetail(data.bankDetail);
          setIsBank(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSellerTransactions();
    fetchUserWithdrawals();
    fetchMyBankDetail();
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
          onClick={() => handleViewBank(row.user?._id)}
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

  const pendingDepositTotal = sellerTransactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingWithdrawTotal = userWithdrawals
    .filter((w) => w.status === "pending")
    .reduce((sum, w) => sum + w.amount, 0);

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
      placeholder: "Account Number",
      label: "Enter Account Number",
    },
    { name: "qr", type: "file", label: "Upload QR code" },
  ];

  const handleBankSubmit = async (data) => {
    setSubmitting(true);
    setBankFormError("");

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
      console.log(error);
      setBankFormError(
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

          {isBank ? (
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
              <div className="text-gray-600 space-y-2">
                <p>
                  <span className="font-semibold">Bank:</span>{" "}
                  {bankDetail?.bankName}
                </p>
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {bankDetail?.fullName}
                </p>
                <p>
                  <span className="font-semibold">Account:</span>{" "}
                  {bankDetail?.accountNumber}
                </p>
                {bankDetail?.qrUrl && (
                  <div>
                    <p>QR code:</p>
                    <img
                      src={bankDetail.qrUrl}
                      alt="QR"
                      height={100}
                      width={100}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
              <p className="text-sm flex items-center gap-2">
                <FileWarning size={24} /> Setup your bank details so sellers
                know where to deposit commission.
              </p>
            </div>
          )}
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
                  Rs. {pendingDepositTotal}
                </h3>
              </div>

              {/* Pending Withdraw */}
              <div className="text-right">
                <p className="text-gray-500 text-sm">Pending Withdraw</p>
                <h3 className="text-lg font-semibold text-red-600">
                  Rs. {pendingWithdrawTotal}
                </h3>
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

      {/* View Bank modal */}
      {bankModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={() => setBankModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Bank Details
            </h2>

            {bankModalLoading && (
              <p className="text-gray-500 text-sm">Loading...</p>
            )}

            {!bankModalLoading && bankModalError && (
              <p className="text-red-500 text-sm">{bankModalError}</p>
            )}

            {!bankModalLoading && bankModalData && (
              <div className="text-gray-600 space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Bank:</span>{" "}
                  {bankModalData.bankName}
                </p>
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {bankModalData.fullName}
                </p>
                <p>
                  <span className="font-semibold">Account:</span>{" "}
                  {bankModalData.accountNumber}
                </p>
                {bankModalData.qrUrl && (
                  <div>
                    <p className="font-semibold mb-1">QR code:</p>
                    <img
                      src={bankModalData.qrUrl}
                      alt="QR"
                      height={120}
                      width={120}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setBankModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {open && (
        <FormModal
          open={open}
          setOpen={setOpen}
          fields={bankFields}
          title="Admin Bank Details"
          btnText={submitting ? "Saving..." : "Submit"}
          onSubmit={handleBankSubmit}
          error={bankFormError}
        />
      )}
    </>
  );
};

export default AdminFund;
