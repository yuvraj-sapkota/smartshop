import { useState } from "react";
import { MapPin, LoaderCircle, CheckCircle2 } from "lucide-react";

const LocationAddressField = ({
  label = "Address",
  name,
  value,
  onChange,
  onLocationChange, // ({ latitude, longitude } | null) => void
  error,
  placeholder = "Enter your address",
}) => {
  const [locationStatus, setLocationStatus] = useState("idle");
  // idle | loading | granted | denied | unavailable
  const [manualMode, setManualMode] = useState(false);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("unavailable");
      setManualMode(true);
      return;
    }

    setLocationStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus("granted");
        setManualMode(false);
        onLocationChange({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setLocationStatus("denied");
        setManualMode(true);
        onLocationChange(null);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  const switchToManual = () => {
    setManualMode(true);
    setLocationStatus("idle");
    onLocationChange(null);
  };

  const switchToLocation = () => {
    setManualMode(false);
    setLocationStatus("idle");
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {!manualMode ? (
        <div
          className={`rounded-lg border p-4 text-center transition-colors ${
            locationStatus === "granted"
              ? "border-green-300 bg-green-50"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          {locationStatus === "granted" ? (
            <>
              <CheckCircle2 className="mx-auto text-green-600" size={28} />
              <p className="text-sm font-medium text-green-700 mt-2">
                Location captured
              </p>
              <button
                type="button"
                onClick={switchToManual}
                className="text-xs text-primary font-medium mt-2 hover:underline"
              >
                Edit manually
              </button>
            </>
          ) : (
            <>
              {/* <p className="text-sm text-gray-600 mt-2">
                Share your location so we can show you the nearest stores
              </p> */}

              <button
                type="button"
                onClick={handleUseLocation}
                disabled={locationStatus === "loading"}
                className="mt-3 inline-flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-70 text-white text-sm font-semibold px-4 py-4 rounded-lg transition-all"
              >
                <MapPin className="mx-auto text-white" size={18} />
                {locationStatus === "loading" ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Getting your location...
                  </>
                ) : (
                  "Share My Location"
                )}
              </button>

              {locationStatus === "denied" && (
                <p className="text-xs text-gray-500 mt-2">
                  Couldn't access your location — no problem, enter it below.
                </p>
              )}
              {locationStatus === "unavailable" && (
                <p className="text-xs text-gray-500 mt-2">
                  Location isn't supported here — enter your address below.
                </p>
              )}

              <button
                type="button"
                onClick={switchToManual}
                className="block mx-auto text-xs text-gray-500 mt-3 hover:underline"
              >
                Enter address manually instead
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {locationStatus === "denied" && (
            <p className="text-xs text-gray-500 mb-2">
              Couldn't access your location — enter your address below.
            </p>
          )}
          {locationStatus === "unavailable" && (
            <p className="text-xs text-gray-500 mb-2">
              Location isn't supported here — enter your address below.
            </p>
          )}
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={4}
            className={`w-full border rounded-lg px-4 py-3 outline-none resize-none transition-all duration-200
              ${
                error
                  ? "border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-300 focus:border-primary focus:ring-4 focus:ring-blue-100"
              }`}
          />
          <button
            type="button"
            onClick={switchToLocation}
            className="text-xs text-primary font-medium mt-2 hover:underline"
          >
            Try location instead
          </button>
        </>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default LocationAddressField;
