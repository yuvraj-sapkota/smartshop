import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import FormModal from "../../../components/FormModal";
import {
  getDueAmount,
  getMyPayments,
  submitPaymentAPI,
} from "../../../services/sellerPayment/sellerPayment.api";
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
    pending:  "bg-yellow-100 text-yellow-600",
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
  { header: "Bank Name",       accessorKey: "bankName" },
  { header: "Account Name",    accessorKey: "accountName" },
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
  const [modalOpen,   setModalOpen]   = useState(false);
  const [depositData, setDepositData] = useState([]);
  const [dueAmount,   setDueAmount]   = useState(0);
  const [loadingPage, setLoadingPage] = useState(true);

  // ── Data fetching ──────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      try {
        // Fetch both in parallel
        const [paymentsRes, dueRes] = await Promise.allSettled([
          getMyPayments(),
          getDueAmount(),
        ]);

        if (paymentsRes.status === "fulfilled") {
          setDepositData(paymentsRes.value.payments ?? []);
        } else {
          showError("Failed to load payment history.");
        }

        if (dueRes.status === "fulfilled") {
          setDueAmount(dueRes.value.due ?? 0);
        } else {
          showError(
            dueRes.reason?.response?.data?.message ?? "Failed to fetch due amount."
          );
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
    body.append("amount",         formData.amount);
    body.append("bankName",       formData.bankName);
    body.append("accountName",    formData.accountName);
    body.append("accountNumber",  formData.accountNumber);
    body.append("screenshotTime", formData.time);
    body.append("screenshot",     formData.screenshot);

    // Let the error bubble up — FormModal's try/catch will surface it
    const data = await submitPaymentAPI(body);

    // Only runs on success
    setDepositData((prev) => [
      { ...data.payment, sn: prev.length + 1 },
      ...prev,
    ]);
    showSuccess(data.message);
    // FormModal closes itself after onSubmit resolves successfully
  };

  // ── Derived data ───────────────────────────────────────────────────────
  const formattedData = depositData.map((item, index) => ({
    ...item,
    sn: index + 1,
  }));

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
            <p>
              <span className="font-semibold">Bank:</span> Nepal Bank Development
            </p>
            <p>
              <span className="font-semibold">Name:</span> Ram Prasad Poudel
            </p>
            <p>
              <span className="font-semibold">Account:</span> 000208987654321
            </p>
          </div>
        </section>

        {/* Due amount + pay button */}
        <div className="flex justify-between items-center bg-white shadow-md border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500 text-sm">Due Amount</p>
            {loadingPage ? (
              <div className="h-7 w-24 bg-gray-100 animate-pulse rounded" />
            ) : (
              <h2 className="text-xl font-bold text-gray-800">
                Rs {dueAmount.toLocaleString()}
              </h2>
            )}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            disabled={loadingPage}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-hover transition disabled:opacity-50 disabled:cursor-not-allowed"
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