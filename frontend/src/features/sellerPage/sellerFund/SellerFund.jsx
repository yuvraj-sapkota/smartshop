import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import FormModal from "../../../components/FormModal";
import {
  getDueAmount,
  getMyPayments,
  submitPaymentAPI,
} from "../../../services/sellerPayment/sellerPayment.api";
import { getAdminBankDetailAPI } from "../../../services/bankDetail/bankDetail.api";
import { showError, showSuccess } from "../../../utils/toast";

// ── Field config for the payment modal ──────────────────────────────────────
const SELLER_FIELDS = [
  {
    name: "amount",
    type: "number",
    placeholder: "e.g. 5000",
    label: "Amount",
    required: true,
  },
  {
    name: "bankName",
    type: "text",
    placeholder: "Bank Name / eSewa",
    label: "Bank Name",
    required: true,
  },
  {
    name: "accountNumber",
    type: "text",
    placeholder: "e.g. 000208987654321",
    label: "Account Number",
    required: true,
  },
  {
    name: "accountName",
    type: "text",
    placeholder: "Account holder name",
    label: "Account Name",
    required: true,
  },
  {
    name: "time",
    type: "text",
    placeholder: "e.g. 10:30 AM",
    label: "Screenshot Time",
    required: true,
  },
  {
    name: "screenshot",
    type: "file",
    label: "Payment Screenshot",
    accept: "image/*",
    required: true,
  },
];

// ── Status badge helper ──────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const styles = {
    rejected: "bg-red-100 text-red-600",
    approved: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
        styles[status] ?? styles.pending
      }`}
    >
      {status}
    </span>
  );
};

// ── Column definitions ───────────────────────────────────────────────────────
const DEPOSIT_COLUMNS = [
  { header: "SN", accessorKey: "sn" },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: (row) => (
      <span className="font-semibold text-gray-800">Rs {row.amount}</span>
    ),
  },
  { header: "Bank Name", accessorKey: "bankName" },
  { header: "Account Name", accessorKey: "accountName" },
  {
    header: "Account Number",
    accessorKey: "accountNumber",
    cell: (row) => <span className="text-gray-700">{row.accountNumber}</span>,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => <StatusBadge status={row.status} />,
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
    header: "Screenshot",
    accessorKey: "screenshot",
    cell: (row) =>
      row.screenshotUrl ? (
        <img
          src={row.screenshotUrl}
          alt="payment proof"
          className="w-12 h-12 object-cover rounded-md"
        />
      ) : (
        <span className="text-gray-400 text-xs">—</span>
      ),
  },
  {
    header: "Date & Time",
    accessorKey: "createdAt",
    cell: (row) => (
      <span className="text-gray-500 text-xs whitespace-nowrap">
        {new Date(row.createdAt).toLocaleString()}
      </span>
    ),
  },
];

// ── Main component ───────────────────────────────────────────────────────────
const SellerFund = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [depositData, setDepositData] = useState([]);
  // const [dueAmount,   setDueAmount]   = useState(0);

  const [dueInfo, setDueInfo] = useState({
    due: 0,
    totalCommission: 0,
    totalPaid: 0,
    totalPending: 0,
    prepaidAmount: 0,
  });

  const [loadingPage, setLoadingPage] = useState(true);
  const [adminBankDetail, setAdminBankDetail] = useState(null);

  // ── Data fetching ──────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      try {
        // Fetch all three in parallel
        const [paymentsRes, dueRes, adminBankRes] = await Promise.allSettled([
          getMyPayments(),
          getDueAmount(),
          getAdminBankDetailAPI(),
        ]);

        if (paymentsRes.status === "fulfilled") {
          setDepositData(paymentsRes.value.payments ?? []);
        } else {
          showError("Failed to load payment history.");
        }

        if (dueRes.status === "fulfilled") {
          const {
            due = 0,
            totalCommission = 0,
            totalPaid = 0,
            totalPending = 0,
            prepaidAmount = 0,
          } = dueRes.value;
          setDueInfo({
            due,
            totalCommission,
            totalPaid,
            totalPending,
            prepaidAmount,
          });
        } else {
          showError(
            dueRes.reason?.response?.data?.message ??
              "Failed to fetch due amount.",
          );
        }

        if (adminBankRes.status === "fulfilled") {
          setAdminBankDetail(adminBankRes.value.bankDetail);
        }
      } finally {
        setLoadingPage(false);
      }
    };

    init();
  }, []);

  // ── Payment submit ─────────────────────────────────────────────────────
  // NOTE: FormModal handles its own loading + error display internally.
  // This function should throw on failure so FormModal can catch it and
  // show the error banner — do NOT call setOpen(false) here.
  const handlePaymentSubmit = async (formData) => {
    const body = new FormData();
    body.append("amount", formData.amount);
    body.append("bankName", formData.bankName);
    body.append("accountName", formData.accountName);
    body.append("accountNumber", formData.accountNumber);
    body.append("screenshotTime", formData.time);
    body.append("screenshot", formData.screenshot);

    // Let the error bubble up — FormModal's try/catch will surface it
    const data = await submitPaymentAPI(body);

    // Only runs on success
    setDepositData((prev) => [
      { ...data.payment, sn: prev.length + 1 },
      ...prev,
    ]);
    setDueInfo((prev) => ({
      ...prev,
      totalPending: prev.totalPending + Number(formData.amount),
    }));
    showSuccess(data.message);
    // FormModal closes itself after onSubmit resolves successfully
  };

  // ── Derived data ───────────────────────────────────────────────────────
  const formattedData = depositData.map((item, index) => ({
    ...item,
    sn: index + 1,
  }));

  // Seller can only submit up to (due - pending) more
  const canPay = true;
  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <>
      <div className="space-y-8">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <PageHeader text="Fund Management" />
        </div>

        {/* Admin bank details */}
        <section aria-labelledby="bank-details-heading">
          <h2
            id="bank-details-heading"
            className="font-semibold text-lg mb-3 text-gray-700"
          >
            Admin's Bank Details
          </h2>
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 text-gray-600 space-y-2 text-sm">
            {adminBankDetail ? (
              <>
                <p>
                  <span className="font-semibold">Bank:</span>{" "}
                  {adminBankDetail.bankName}
                </p>
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {adminBankDetail.fullName}
                </p>
                <p>
                  <span className="font-semibold">Account:</span>{" "}
                  {adminBankDetail.accountNumber}
                </p>
                {adminBankDetail.qrUrl && (
                  <img
                    src={adminBankDetail.qrUrl}
                    alt="QR"
                    height={100}
                    width={100}
                  />
                )}
              </>
            ) : (
              <p className="text-gray-400">
                Admin hasn't set up bank details yet.
              </p>
            )}
          </div>
        </section>

        {/* Due amount + pay button */}
        <div className="flex  gap-4  justify-between items-start bg-white shadow-md border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500 text-sm">Due Amount</p>
            {loadingPage ? (
              <div className="h-7 w-24 bg-gray-100 animate-pulse rounded" />
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800">
                  Rs {dueInfo.due.toLocaleString()}
                </h2>
                {/* Breakdown — only shown after load */}
                <div className="text-xs text-gray-400 space-y-0.5 mt-1">
                  <p>
                    Total Commission: Rs
                    {dueInfo.totalCommission.toLocaleString()}
                  </p>
                  <p>
                    Approved Paid &nbsp;: Rs{" "}
                    {dueInfo.totalPaid.toLocaleString()}
                  </p>
                  {dueInfo.totalPending > 0 && (
                    <p className="text-yellow-500 font-medium">
                      Pending Approval: Rs{" "}
                      {dueInfo.totalPending.toLocaleString()} — awaiting admin
                      review
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          {/* {dueInfo.prepaidAmount > 0 && (
            <p className="text-green-600 font-medium">
              Prepaid Credit: Rs {dueInfo.prepaidAmount.toLocaleString()}
            </p>
          )} */}
          <div>
            <p className="text-gray-500 text-sm">Prepaid Amount</p>
            <h2 className="text-xl font-bold text-gray-800">
              Rs {dueInfo.prepaidAmount.toLocaleString()}
            </h2>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            disabled={loadingPage || !canPay}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-hover transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Pay Due
          </button>
        </div>

        {/* Payment history */}
        <section aria-labelledby="history-heading">
          <h2
            id="history-heading"
            className="font-semibold text-lg text-gray-700 mb-3"
          >
            Payment History
          </h2>
          {loadingPage ? (
            <div className="h-40 bg-gray-50 border rounded-lg animate-pulse" />
          ) : (
            <DataTable columns={DEPOSIT_COLUMNS} data={formattedData} />
          )}
        </section>
      </div>

      {/* Payment modal — FormModal manages its own loading & error state */}
      <FormModal
        open={modalOpen}
        setOpen={setModalOpen}
        fields={SELLER_FIELDS}
        title="Payment Details"
        btnText="Submit Payment"
        onSubmit={handlePaymentSubmit}
      />
    </>
  );
};

export default SellerFund;
