import React, { useRef, useState } from "react";
import PageHeader from "./PageHeader";
import { X } from "lucide-react";

const FormModal = ({ open, setOpen, fields, title, btnText, onSubmit }) => {
  const [form, setForm] = useState({});
  const [preview, setPreview] = useState({});
  const inputRef = useRef(null);

  if (!open) return null;

  const handleChange = (e, field) => {
    const { value, files } = e.target;

    if (field.type === "file") {
      const file = files[0];
      setForm({ ...form, [field.name]: file });
      setPreview({ ...preview, [field.name]: URL.createObjectURL(file) });
    } else {
      setForm({ ...form, [field.name]: value });
    }
  };

  const handleSubmit = () => {
    onSubmit(form);
    setOpen(false);
  };
  return (
    <>
      <div className="fixed inset-0 px-4 bg-black/40 flex items-center justify-center z-50 backdrop-blur-md">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <PageHeader text={title} />
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          <div className="space-y-4 mb-4">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label>{field.label}</label>
                <input
                  ref={inputRef}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full border rounded-lg px-3 py-2"
                  onChange={(e) => handleChange(e, field)}
                />

                {/* IMAGE PREVIEW */}
                {field.type === "file" && preview?.[field.name] && (
                  <div className="flex  justify-between items-center border border-dashed border-gray-400 p-2 mt-2">
                    <img
                      src={preview[field.name]}
                      className="w-20 h-20 mt-2 rounded"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setPreview((prev) => ({ ...prev, [field.name]: null }));
                        setForm((prev) => ({ ...prev, [field.name]: null }));
                        inputRef.current.value = "";
                      }}
                      className="text-sm text-red-500 mt-1 border cursor-pointer  p-2 rounded-md"
                    >
                      <X />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-white py-2 rounded-lg mt-5 hover:bg-primary-hover transition cursor-pointer"
          >
            {btnText}
          </button>
        </div>
      </div>
    </>
  );
};

export default FormModal;
