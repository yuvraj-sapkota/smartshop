import { MapPin, Store } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import StoreModal from "./StoreModal";

const formatDistance = (meters) => {
  if (meters < 1000) {
    return `${Math.round(meters)} m away`;
  }
  return `${(meters / 1000).toFixed(1)} km away`;
};

export default function StoreCard({ store }) {
  const [showModal, setShowModal] = useState(false);

  console.log(store)
  // store ko first 2 letters likaleko
  const words = store.storeName.trim().split(/\s+/);
  const initials =
    words.length > 1
      ? words
          .map((w) => w[0])
          .slice(0, 2)
          .join("")
      : words[0].slice(0, 2);
  const finalInitials = initials.toUpperCase();

  // modal open huda background ko ui scrollable na hos
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);
  return (
    <>
      <div className=" w-full bg-white rounded-2xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition ">
        {/* Store Info */}
        <div className="mb-3 flex items-center justify-between border-b border-gray-300 pb-4">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <div className="bg-primary text-white px-3 py-2 rounded-lg">
              {finalInitials}
            </div>

            <div>
              {/* <div className="flex items-center gap-2 flex-wrap"> */}
              <h2 className="text-xl font-semibold text-gray-800">
                {store.storeName}
              </h2>

              {store.distance != null && (
                <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {formatDistance(store.distance)}
                </span>
              )}
              {/* </div> */}

              {store.storeAddress && (
                <p className="text-gray-500 text-xs flex items-center gap-0.5 ml-1">
                  <MapPin size={12} />
                  {store.storeAddress}
                </p>
              )}
            </div>
          </div>

          {/* Right side - WhatsApp */}
          <a
            href={`https://wa.me/${store.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary-hover text-white p-2 rounded-full transition"
          >
            <FaWhatsapp size={22} />
          </a>
        </div>

        {/* products*/}
        <div className="mb-6">
          <h3 className="text-sm  text-gray-600 mb-2">Featured Items</h3>
        </div>

        {/* Products */}
        <div className="mb-4 h-28  ">
          {store.products.length > 0 ? (
            <>
              <ul className="space-y-1 text-gray-700 text-sm font-semibold  ">
                {store.products.slice(0, 3).map((item) => (
                  <li key={item._id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>Rs {Number(item.price).toLocaleString()}</span>
                  </li>
                ))}
              </ul>

              {store.products.length > 3 && (
                <p
                  onClick={() => setShowModal(true)}
                  className="text-sm text-primary mt-4 font-medium hover:cursor-pointer w-fit"
                >
                  +{store.products.length - 3} more products
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400 flex items-center justify-center h-full">
              No products yet
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end border-t border-gray-200  ">
          {/* <button className="px-4 py-3 text-sm border rounded-lg hover:bg-gray-100 transition">
            Details
          </button> */}
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-3 mt-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-hover transition"
          >
            View all products
          </button>
        </div>
      </div>

      {showModal && (
        <StoreModal
          finalInitials={finalInitials}
          store={store}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
