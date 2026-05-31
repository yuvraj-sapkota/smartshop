// store bata products fetch garcha, modal open/close matra handle garcha

import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import CreateSalesModal from "./createOrderComponents/CreateSalesModal";
import useProductStore from "../../../store/productStore/productStore";


const CreateOrder = () => {
  const products = useProductStore((state) => state.products);
  const getMyProducts = useProductStore((state) => state.getMyProducts);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getMyProducts();
  }, [getMyProducts]);

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <PageHeader text="Create" />
          <button
            onClick={() => setOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            Create Sales
          </button>
        </div>
      </div>

      <CreateSalesModal
        open={open}
        onClose={() => setOpen(false)}
        products={products}
      />
    </>
  );
};

export default CreateOrder;