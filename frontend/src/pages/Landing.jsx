import Navbar from "../components/navbar/Navbar";
import StoreCard from "../components/StoreCard";
import EmptyState from "../components/EmptyState";

import { useState } from "react";
import { useEffect } from "react";
import { getAllStoreAPI } from "../services/allStore/allStore.api";
import { showError } from "../utils/toast";

export default function Landing() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getAllStoreAPI();
        setStores(data.stores);
      } catch (error) {
        console.log(error);
        showError(error?.response?.data?.message || "Failed to load shopss");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);
  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 mb-10 mt-8  ">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-8 w-8 rounded-full border-2 border-gray-200 border-t-primary animate-spin" />
            <p className="text-gray-400">Loading....</p>
          </div>
        ) : stores.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {stores.map((store) => (
              <StoreCard key={store.sellerId} store={store} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// login na vako bela dekhauni landing page
