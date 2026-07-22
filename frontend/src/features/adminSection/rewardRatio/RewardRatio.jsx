import { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import StatCard from "../../../components/StatCard";
import FormModal from "../../../components/FormModal";
import { Percent, Gift, Users } from "lucide-react";
import {
  getRewardConfigAPI,
  updateRewardConfigAPI,
} from "../../../services/rewardConfig/rewardConfig.api";
import { showError, showSuccess } from "../../../utils/toast";

const RATIO_FIELDS = [
  {
    name: "cashbackPercent",
    type: "number",
    placeholder: "e.g. 25",
    label: "Cashback (%)",
    required: true,
  },
  {
    name: "userReferralPercent",
    type: "number",
    placeholder: "e.g. 10",
    label: "User Referral (%)",
    required: true,
  },
  {
    name: "sellerReferralPercent",
    type: "number",
    placeholder: "e.g. 10",
    label: "Seller Referral (%)",
    required: true,
  },
];

const RewardRatio = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchConfig = async () => {
    try {
      const data = await getRewardConfigAPI();
      console.log(data);
      setConfig(data.config);
    } catch (error) {
      showError("Failed to load reward ratios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async (formData) => {
    const payload = {
      cashbackRate: Number(formData.cashbackPercent) / 100,
      userReferralRate: Number(formData.userReferralPercent) / 100,
      sellerReferralRate: Number(formData.sellerReferralPercent) / 100,
    };
    const data = await updateRewardConfigAPI(payload);
    setConfig(data.config);
    showSuccess(data.message);
  };

  const commissionConfig = config
    ? [
        {
          _id: 1,
          label: "Cashback",
          value: `${(config.cashbackRate * 100).toFixed(0)}%`,
          icon: Gift,
          bg: "bg-green-100",
          text: "text-green-600",
        },
        {
          _id: 2,
          label: "User Referral",
          value: `${(config.userReferralRate * 100).toFixed(0)}%`,
          icon: Users,
          bg: "bg-blue-100",
          text: "text-blue-600",
        },
        {
          _id: 3,
          label: "Seller Referral",
          value: `${(config.sellerReferralRate * 100).toFixed(0)}%`,
          icon: Percent,
          bg: "bg-purple-100",
          text: "text-purple-600",
        },
      ]
    : [];

  return (
    <>
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <PageHeader text="Fix Reward Ratio" />
          <button
            onClick={() => setOpen(true)}
            disabled={loading}
            className="bg-white text-primary border border-primary px-5 py-2 rounded-lg hover:bg-primary hover:text-white transition cursor-pointer disabled:opacity-50"
          >
            Edit Ratios
          </button>
        </div>

        {loading ? (
          <p className="text-xs text-gray-500">Loading....</p>
        ) : (
          <div className="space-y-4">
            {commissionConfig.map((item) => (
              <StatCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>

      <FormModal
        open={open}
        setOpen={setOpen}
        fields={RATIO_FIELDS}
        title="Edit Reward Ratios"
        btnText="Save"
        onSubmit={handleSave}
        defaultValues={
          config
            ? {
                cashbackPercent: String(config.cashbackRate * 100),
                userReferralPercent: String(config.userReferralRate * 100),
                sellerReferralPercent: String(config.sellerReferralRate * 100),
              }
            : {}
        }
      />
    </>
  );
};

export default RewardRatio;
