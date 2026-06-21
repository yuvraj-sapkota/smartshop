import React, { useRef, useState, useEffect, useCallback } from "react";
import { X, UploadCloud, Loader } from "lucide-react";

// ---------------------------------------------------------------------------
// PropTypes-style JSDoc for documentation (replace with TS types if using TS)
// ---------------------------------------------------------------------------
/**
 * @typedef {Object} Field
 * @property {string}  name         - Unique field key
 * @property {string}  label        - Display label
 * @property {string}  type         - Input type: text | email | password | number | file | select | textarea
 * @property {string}  [placeholder]
 * @property {boolean} [required]
 * @property {Array<{label:string, value:string}>} [options] - For select type
 * @property {string}  [accept]     - For file type (e.g. "image/*")
 * @property {string}  [validate]   - "email" | "phone" | custom regex string
 */

/**
 * @param {Object}   props
 * @param {boolean}  props.open
 * @param {Function} props.setOpen
 * @param {Field[]}  props.fields
 * @param {string}   props.title
 * @param {string}   props.btnText
 * @param {Function} props.onSubmit  - Can be async. Receives FormData-like object.
 */
const FormModal = ({
  open,
  setOpen,
  fields = [],
  title,
  btnText = "Submit",
  onSubmit,
}) => {
  const [form, setForm] = useState({});
  const [previews, setPreviews] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Individual refs per field name
  const inputRefs = useRef({});

  // ── Reset all state when modal opens/closes ────────────────────────────
  useEffect(() => {
    if (!open) {
      // Revoke every object URL to avoid memory leaks
      Object.values(previews).forEach((url) => url && URL.revokeObjectURL(url));
      setForm({});
      setPreviews({});
      setErrors({});
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ── Revoke object URLs on unmount ──────────────────────────────────────
  useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => url && URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Escape key closes the modal ────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ── Close handler ──────────────────────────────────────────────────────
  const handleClose = useCallback(() => {
    if (loading) return; // prevent close mid-submit
    setOpen(false);
  }, [loading, setOpen]);

  // ── Validation ─────────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};

    fields.forEach((field) => {
      const value = form[field.name];
      const isEmpty = value === undefined || value === null || value === "";

      if (field.required && isEmpty) {
        newErrors[field.name] = `${field.label} is required.`;
        return;
      }

      if (!isEmpty) {
        if (
          field.validate === "email" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          newErrors[field.name] = "Enter a valid email address.";
        }
        if (
          field.validate === "phone" &&
          !/^\+?[\d\s\-()]{7,15}$/.test(value)
        ) {
          newErrors[field.name] = "Enter a valid phone number.";
        }
      }
    });

    return newErrors;
  };

  // ── Field change handler ───────────────────────────────────────────────
  const handleChange = (e, field) => {
    const { value, files } = e.target;

    // Clear error for this field on change
    if (errors[field.name]) {
      setErrors((prev) => ({ ...prev, [field.name]: undefined }));
    }

    if (field.type === "file") {
      const file = files[0];
      if (!file) return;

      // Revoke previous URL before creating a new one
      if (previews[field.name]) URL.revokeObjectURL(previews[field.name]);

      const url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, [field.name]: file }));
      setPreviews((prev) => ({ ...prev, [field.name]: url }));
    } else {
      setForm((prev) => ({ ...prev, [field.name]: value }));
    }
  };

  // ── Clear a file field ─────────────────────────────────────────────────
  const clearFile = (fieldName) => {
    if (previews[fieldName]) URL.revokeObjectURL(previews[fieldName]);
    setPreviews((prev) => ({ ...prev, [fieldName]: null }));
    setForm((prev) => ({ ...prev, [fieldName]: null }));
    if (inputRefs.current[fieldName]) inputRefs.current[fieldName].value = "";
  };

  // ── Submit ─────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first errored field
      const firstErroredField = fields.find((f) => validationErrors[f.name]);
      if (firstErroredField && inputRefs.current[firstErroredField.name]) {
        inputRefs.current[firstErroredField.name].focus();
      }
      return;
    }

    setLoading(true);
    try {
      await onSubmit(form);
      handleClose();
    } catch (err) {
      // Surface a top-level submit error if the promise rejects
      setErrors({
        _form: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ── Render a field based on its type ──────────────────────────────────
  const renderField = (field) => {
    const sharedProps = {
      id: field.name,
      ref: (el) => (inputRefs.current[field.name] = el),
      name: field.name,
      placeholder: field.placeholder,
      disabled: loading,
      "aria-invalid": !!errors[field.name],
      "aria-describedby": errors[field.name]
        ? `${field.name}-error`
        : undefined,
      className: `w-full border rounded-lg px-3 py-2 text-sm transition focus:outline-none focus:ring-2 ${
        errors[field.name]
          ? "border-red-400 focus:ring-red-300"
          : "border-gray-300 focus:ring-blue-300"
      } disabled:opacity-50 disabled:cursor-not-allowed`,
      onChange: (e) => handleChange(e, field),
    };

    if (field.type === "textarea") {
      return (
        <textarea
          {...sharedProps}
          rows={4}
          value={form[field.name] || ""}
          className={`${sharedProps.className} resize-none`}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select {...sharedProps} value={form[field.name] || ""}>
          <option value="" disabled>
            {field.placeholder || `Select ${field.label}`}
          </option>
          {(field.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "file") {
      return (
        <>
          {/* Hidden real file input */}
          <input
            {...sharedProps}
            type="file"
            accept={field.accept || "*/*"}
            className="hidden"
          />

          {/* Custom styled trigger */}
          {!previews[field.name] ? (
            <button
              type="button"
              disabled={loading}
              onClick={() => inputRefs.current[field.name]?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center gap-1 text-gray-400 hover:border-primary hover:text-primary transition disabled:opacity-50"
            >
              <UploadCloud size={22} />
              <span className="text-xs">Click to upload</span>
            </button>
          ) : (
            <div className="flex items-center justify-between border border-dashed border-gray-300 rounded-lg p-2 gap-3">
              <img
                src={previews[field.name]}
                alt="Preview"
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 truncate">
                  {form[field.name]?.name}
                </p>
                <button
                  type="button"
                  onClick={() => inputRefs.current[field.name]?.click()}
                  className="text-xs text-primary hover:underline mt-0.5"
                  disabled={loading}
                >
                  Change
                </button>
              </div>
              <button
                type="button"
                onClick={() => clearFile(field.name)}
                disabled={loading}
                aria-label="Remove file"
                className="p-1.5 rounded-md border border-gray-200 text-red-400 hover:bg-red-50 transition disabled:opacity-50"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </>
      );
    }

    // Default: text, email, password, number, date, etc.
    return (
      <input
        {...sharedProps}
        type={field.type || "text"}
        value={form[field.name] || ""}
      />
    );
  };

  if (!open) return null;

  return (
    // Backdrop — click outside to close
    <div
      role="presentation"
      className="fixed inset-0 px-4 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={handleClose}
    >
      {/* Modal panel — stop propagation so clicks inside don't close */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white w-full max-w-md rounded-xl shadow-xl p-5 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-gray-800 leading-tight"
          >
            {title}
          </h2>
          <button
            onClick={handleClose}
            disabled={loading}
            aria-label="Close modal"
            className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form-level error */}
        {errors._form && (
          <div
            role="alert"
            className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
          >
            {errors._form}
          </div>
        )}

        {/* Fields */}
        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 pr-1">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                {field.label}
                {field.required && (
                  <span className="text-red-500 ml-0.5" aria-hidden="true">
                    *
                  </span>
                )}
              </label>

              {renderField(field)}

              {/* Field error */}
              {errors[field.name] && (
                <p
                  id={`${field.name}-error`}
                  role="alert"
                  className="text-xs text-red-500 mt-0.5"
                >
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="mt-5 w-full bg-primary hover:bg-primary-hover  disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" />
              Submitting…
            </>
          ) : (
            btnText
          )}
        </button>
      </div>
    </div>
  );
};

export default FormModal;
