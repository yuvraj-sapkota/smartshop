import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  User,
  MapPin,
  Calendar,
  Store,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import {
  getSingleSeller,
  updateSellerStatus,
} from "../../../services/seller/seller.api";
import { showError } from "../../../utils/toast";

const SellerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  const statusBadge = {
    pending: "bg-amber-50 text-amber-700",
    approved: "bg-teal-50 text-teal-700",
    rejected: "bg-red-50 text-red-700",
  };

  const handleStatusUpdate = async (status) => {
    try {
      const res = await updateSellerStatus(id, status);

      setSeller(res.seller);
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const data = await getSingleSeller(id);
        setSeller(data.seller);
      } catch (error) {
        showError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [id]);

  if (loading) {
    return <p className="text-sm text-gray-400">Loading...</p>;
  }

  if (!seller) {
    return <p>Seller not found</p>;
  }

  const initials = seller.username?.slice(0, 2).toUpperCase();

  return (
    <div className="space-y-6 pb-10">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          <ArrowLeft size={16} /> Back to sellers
        </button>

        <span
          className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
            statusBadge[seller.sellerStatus]
          }`}
        >
          {seller.sellerStatus}
        </span>
      </div>

      {/* Admin action */}
      {seller.sellerStatus === "pending" && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <ShieldCheck size={13} /> Admin action
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleStatusUpdate("approved")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition"
            >
              Approve seller
            </button>

            <button
              onClick={() => handleStatusUpdate("rejected")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition"
            >
              Reject seller
            </button>
          </div>
        </div>
      )}

      {/* Personal info */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-semibold text-sm ">
            {initials}
          </div>

          <div>
            <p className="font-semibold text-gray-900">{seller.username}</p>

            <p className="text-sm text-gray-500">
              {seller.storeName} · Member since{" "}
              {new Date(seller.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: <Mail size={16} />, label: "Email", val: seller.email },
            {
              icon: <User size={16} />,
              label: "Username",
              val: seller.username,
            },
            {
              icon: <MapPin size={16} />,
              label: "Address",
              val: seller.storeAddress,
            },
            {
              icon: <Store size={16} />,
              label: "Store",
              val: seller.storeName,
            },
            {
              icon: <Calendar size={16} />,
              label: "Joined",
              val: new Date(seller.createdAt).toDateString(),
            },
          ].map(({ icon, label, val }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-sm  transition"
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                  {icon}
                </div>

                <span className="text-sm font-medium text-gray-600 ">
                  {label}
                </span>
              </div>

              {/* RIGHT SIDE */}
              <span className="text-sm font-semibold text-gray-800 truncate max-w-[140px] text-right">
                {val || "--"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Referred by */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <UserCheck size={13} /> Referred by
        </p>

        {seller.referredBy ? (
          <p className="text-sm text-gray-700 font-medium">
            {seller.referredBy.username}
          </p>
        ) : (
          <p className="text-sm text-gray-400">No referral</p>
        )}
      </div>
    </div>
  );
};

export default SellerDetail;
