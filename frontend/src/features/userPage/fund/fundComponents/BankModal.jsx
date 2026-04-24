import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function BankModal({ open, setOpen }) {
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    fullName: "",
    accountNumber: "",
    qr: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // 👉 Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "qr") {
      const file = files[0];
      setBankDetails({ ...bankDetails, qr: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setBankDetails({ ...bankDetails, [name]: value });
    }
  };

  // 👉 Validation
  const validate = () => {
    let newErrors = {};

    if (!bankDetails.bankName) newErrors.bankName = "Bank name required";
    if (!bankDetails.fullName) newErrors.fullName = "Full name required";
    if (!bankDetails.accountNumber)
      newErrors.accountNumber = "Account number required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 👉 Submit
  const handleSubmit = () => {
    if (!validate()) return;

    console.log(bankDetails);

    setOpen(false);
  };

  return (
    <div className="fixed inset-0 px-4 bg-black/40 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4">
        {/* CLOSE */}

        {/* TITLE */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold ">Setup Bank Details</h2>
          <button
            onClick={() => setOpen(false)}
            className=" text-gray-500 hover:text-black "
          >
            <X size={28} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4 mb-4">
          {/* Bank Name */}
          <div className="flex flex-col gap-1">
            <label>Bank Name</label>
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              value={bankDetails.bankName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.bankName && (
              <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>
            )}
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={bankDetails.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Account Number */}
          <div className="flex flex-col gap-1">
            <label>Account Number</label>
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              value={bankDetails.accountNumber}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.accountNumber}
              </p>
            )}
          </div>

          {/* QR Upload */}
          <div className="flex flex-col gap-1">
            <label>Qr code</label>

            {!preview && (
              <input
                type="file"
                name="qr"
                accept="image/*"
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            )}

            {/* Preview */}
            {preview && (
              <div className="mt-2 border-2 border-gray-400 border-dashed p-2 flex justify-between items-center ">
                <img
                  src={preview}
                  alt="QR Preview"
                  className="w-24 h-24 rounded  "
                />
                {/* Change button */}
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  className="text-sm text-red-500 mt-1 border cursor-pointer  p-2 rounded-md"
                >
                  <X />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ACTION */}
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-2 rounded-lg mt-5 hover:bg-primary-hover transition cursor-pointer"
        >
          Save Details
        </button>
      </div>
    </div>
  );
}
