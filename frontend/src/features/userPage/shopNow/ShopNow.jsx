import React from "react";
import StoreCard from "../../../components/StoreCard";
import { useState } from "react";
import { useEffect } from "react";
import { getAllStoreAPI } from "../../../services/allStore/allStore.api";

const ShopNow = () => {
  const [stores, setStores] = useState([]);
  const [locationStatus, setLocationStatus] = useState("idle");

  const fetchStores = async (coords) => {
    try {
      const data = await getAllStoreAPI(coords);
      console.log(data);
      setStores(data.stores);
    } catch (error) {
      console.log(error);
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
    fetchStores();
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
