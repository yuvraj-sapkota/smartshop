import React from "react";
import StoreCard from "../../../components/StoreCard";
import { useState } from "react";
import { useEffect } from "react";
import { getAllStoreAPI } from "../../../services/allStore/allStore.api";
import { MapPin } from "lucide-react";
import EmptyState from "../../../components/EmptyState";
import { showError } from "../../../utils/toast";

const ShopNow = () => {
  const [stores, setStores] = useState([]);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [loading, setLoading] = useState(true);

  const fetchStores = async (coords) => {
    try {
      const data = await getAllStoreAPI(coords);

      setStores(data.stores);
    } catch (error) {
      showError(error.response?.data?.message || "Failed to load shops");
    } finally {
      setLoading(false);
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("unavailable");
      fetchStores();
      return;
    }

    setLocationStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus("granted");
        fetchStores({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setLocationStatus("denied");
        fetchStores();
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 },
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto mb-10">
        {locationStatus === "denied" && (
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <MapPin size={16} />
              Enable location to see shops closest to you first.
            </p>
            <button
              onClick={requestLocation}
              className="text-xs font-medium text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-8 w-8 rounded-full border-2 border-gray-200 border-t-primary animate-spin" />
            <p className="text-gray-400">Loading....</p>
          </div>
        ) : stores.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {stores.map((store) => (
              <StoreCard key={store.sellerId} store={store} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ShopNow;
