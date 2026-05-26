import React from "react";
import StoreCard from "../../../components/StoreCard";
import { useState } from "react";
import { useEffect } from "react";
import { getAllStoreAPI } from "../../../services/allStore/allStore.api";

const ShopNow = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getAllStoreAPI();

        setStores(data.stores);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStores();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {stores.map((store) => (
            <StoreCard key={store.sellerId} store={store} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopNow;
