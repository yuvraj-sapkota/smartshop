import React from "react";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText,
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
        <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6">
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

          {/* Message */}
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            {message}
          </p>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              {loading ? "Please wait..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
