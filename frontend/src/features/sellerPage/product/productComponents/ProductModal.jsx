import { X } from "lucide-react";
import React, { useState } from "react";
import useProductStore from "../../../../store/productStore/productStore";

const ProductModal = ({ open, setOpen }) => {
  const { createProduct, loading } = useProductStore();
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    commission: "",
    measure: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductDetails({ ...productDetails, [name]: value });
  };

  const validation = () => {
    let newErrors = {};

    if (!productDetails.name.trim())
      newErrors.name = "Product name is required";

    if (!productDetails.price) {
      newErrors.price = "Price is required";
    } else if (
      isNaN(Number(productDetails.price)) ||
      Number(productDetails.price) <= 0
    ) {
      newErrors.price = "Price must be a valid number greater than 0";
    }

    if (!productDetails.commission) {
      newErrors.commission = "Commission is required";
    } else if (
      isNaN(Number(productDetails.commission)) ||
      Number(productDetails.commission) <= 0
    ) {
      newErrors.commission = "Commission must be a valid number greater than 0";
    } else if (
      Number(productDetails.commission) > Number(productDetails.price)
    ) {
      newErrors.commission = "Commission cannot be greater than price";
    }

    if (!productDetails.measure.trim())
      newErrors.measure = "Measure is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validation()) return;

    await createProduct({
      ...productDetails,
      price: Number(productDetails.price),
      commission: Number(productDetails.commission),
    });

    setOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/40 z-50 px-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4">
          {/* TITLE */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold ">Add Products</h2>
            <button
              onClick={() => setOpen(false)}
              className=" text-gray-500 hover:text-black "
            >
              <X size={28} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.name && (
                <p className="text-red-500 text-xs ">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>Product Price</label>
              <input
                type="text"
                name="price"
                onChange={handleChange}
                placeholder="Product Price"
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.price && (
                <p className="text-red-500 text-xs ">{errors.price}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>Commission</label>
              <input
                type="text"
                name="commission"
                onChange={handleChange}
                placeholder="Eg Rs 5"
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.commission && (
                <p className="text-red-500 text-xs ">{errors.commission}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>Measure</label>
              <input
                type="text"
                name="measure"
                onChange={handleChange}
                placeholder="kg/litre/pcs"
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.measure && (
                <p className="text-red-500 text-xs ">{errors.measure}</p>
              )}
            </div>
            <button
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg mt-5 hover:bg-primary-hover transition cursor-pointer"
            >
              {loading ? "Saving..." : "Save Details"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
