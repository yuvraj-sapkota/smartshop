import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import FormModal from "../../components/FormModal";
import useAuthStore from "../../store/auth/authStore";
import {
  getMyProfileAPI,
  updateMyProfileAPI,
  changePasswordAPI,
} from "../../services/profile/profile.api";
import { showError, showSuccess } from "../../utils/toast";
import { LucideHome, Mail, MapPin, Phone, User } from "lucide-react";
import { addReferralAPI } from "../../services/profile/profile.api";

const PROFILE_FIELDS_BASE = [
  { name: "username", type: "text", label: "Username", required: true },
  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    validate: "email",
  },
  {
    name: "phone",
    type: "text",
    label: "Phone",
    placeholder: "e.g. 98XXXXXXXX",
  },
  { name: "address", type: "text", label: "Address" },
];

const SELLER_EXTRA_FIELDS = [
  { name: "storeName", type: "text", label: "Store Name" },
  { name: "storeAddress", type: "text", label: "Store Address" },
];

const PASSWORD_FIELDS = [
  {
    name: "currentPassword",
    type: "password",
    label: "Current Password",
    required: true,
  },
  {
    name: "newPassword",
    type: "password",
    label: "New Password",
    required: true,
  },
];

const REFERRAL_FIELDS = [
  {
    name: "referralUsername",
    type: "text",
    label: "Referrer's Username",
    required: true,
  },
];

const Profile = () => {
  const role = useAuthStore((state) => state.user?.role);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [referralOpen, setReferralOpen] = useState(false);

  const handleAddReferral = async (formData) => {
    const data = await addReferralAPI(formData.referralUsername);
    setProfile(data.profile);
    showSuccess(data.message || "Referral added successfully");
  };

  const fetchProfile = async () => {
    try {
      const data = await getMyProfileAPI();
      setProfile(data.profile);
    } catch (error) {
      showError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fields =
    role === "seller"
      ? [...PROFILE_FIELDS_BASE, ...SELLER_EXTRA_FIELDS]
      : PROFILE_FIELDS_BASE;

  const handleUpdateProfile = async (formData) => {
    const data = await updateMyProfileAPI(formData);
    setProfile(data.profile);
    showSuccess(data.message || "Profile updated successfully");
  };

  const handleChangePassword = async (formData) => {
    if (formData.newPassword.length < 6) {
      throw new Error("New password must be at least 6 characters.");
    }
    const data = await changePasswordAPI(formData);
    showSuccess(data.message || "Password changed successfully");
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <PageHeader text="My Profile" />
          <div className="flex gap-3">
            <button
              onClick={() => setPasswordOpen(true)}
              disabled={loading}
              className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition disabled:opacity-50"
            >
              Change Password
            </button>
            <button
              onClick={() => setEditOpen(true)}
              disabled={loading}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition disabled:opacity-50"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : (
          <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-400 flex items-center gap-2 font-medium">
                <span>
                  <User size={16} />
                </span>{" "}
                Username
              </p>
              <p className="font-medium text-gray-800">{profile?.username}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 flex items-center gap-2 font-medium">
                {" "}
                <span>
                  <Mail size={14} />
                </span>{" "}
                Email
              </p>
              <p className="font-medium text-gray-800">{profile?.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 flex items-center gap-2 font-medium ">
                {" "}
                <span>
                  <Phone size={14} />
                </span>
                Phone
              </p>
              <p className="font-medium text-gray-800">
                {profile?.phone || "not provided"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 flex items-center gap-2 font-medium">
                <span>
                  <MapPin size={14} />{" "}
                </span>{" "}
                Address
              </p>
              <p className="font-medium text-gray-800">
                {profile?.address || "-"}
              </p>
            </div>
            {role === "seller" && (
              <>
                <div>
                  <p className="text-xs text-gray-400 flex items-center gap-2 font-medium">
                    <span>
                      <LucideHome size={16} />
                    </span>{" "}
                    Store Name
                  </p>
                  <p className="font-medium text-gray-800">
                    {profile?.storeName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 flex items-center gap-2 font-medium">
                    <span>
                      <MapPin size={14} />{" "}
                    </span>{" "}
                    Store Address
                  </p>
                  <p className="font-medium text-gray-800">
                    {profile?.storeAddress || "-"}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <PageHeader text="Refered by" />
          {!profile?.referredBy && (
            <button
              onClick={() => setReferralOpen(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              Add referral
            </button>
          )}
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
          <p className="text-xs text-gray-400 flex items-center gap-2 font-medium">
            <span>
              <User size={14} />{" "}
            </span>{" "}
            Refer by
          </p>
          {profile?.referredBy?.username ? (
            <p className="text-sm font-medium text-gray-800">
              {profile?.referredBy?.username}
            </p>
          ) : (
            <p className="text-sm text-gray-400">No referral</p>
          )}
        </div>
      </div>

      <FormModal
        open={editOpen}
        setOpen={setEditOpen}
        fields={fields}
        title="Edit Profile"
        btnText="Save"
        onSubmit={handleUpdateProfile}
        defaultValues={profile || {}}
      />

      <FormModal
        open={passwordOpen}
        setOpen={setPasswordOpen}
        fields={PASSWORD_FIELDS}
        title="Change Password"
        btnText="Update Password"
        onSubmit={handleChangePassword}
      />

      <FormModal
        open={referralOpen}
        setOpen={setReferralOpen}
        fields={REFERRAL_FIELDS}
        title="Add Referral"
        btnText="Save"
        onSubmit={handleAddReferral}
      />
    </>
  );
};

export default Profile;
