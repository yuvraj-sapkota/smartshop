import {
  Wallet,
  DollarSign,
  TrendingUp,
  CheckCircle,
  ShoppingCart,
  Package,
  Clock,
} from "lucide-react";
import StatCard from "../../../components/StatCard";
import { useEffect, useState } from "react";
import { getSellerDashboardStatsAPI } from "../../../services/sellerDashboard/sellerDashboard.api";
import { showError } from "../../../utils/toast";

const SellerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getSellerDashboardStatsAPI();
        setStats(data.stats);
      } catch (error) {
        showError(
          error.response?.data?.message || "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const sellerStats = [
    {
      _id: 1,
      label: "Total Sales",
      value: stats?.totalSales ?? 0,
      icon: ShoppingCart,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      _id: 2,
      label: "Total Commission",
      value: stats?.totalCommission ?? 0,
      icon: TrendingUp,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      _id: 3,
      label: "Due Commission",
      value: stats?.dueCommission ?? 0,
      icon: DollarSign,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      _id: 4,
      label: "Pending Deposit",
      value: stats?.pendingDeposit ?? 0,
      icon: Clock,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    {
      _id: 5,
      label: "Commission Paid",
      value: stats?.totalCommissionPaid ?? 0,
      icon: CheckCircle,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      _id: 6,
      label: "Prepaid Amount",
      value: stats?.prepaidAmount ?? 0,
      icon: Wallet,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    {
      _id: 7,
      label: "Total Product",
      value: stats?.totalProducts ?? 0,
      icon: Package,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    {
      _id: 8,
      label: "Pending Product",
      value: stats?.pendingProducts ?? 0,
      icon: Package,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
  ];

  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl text-primary mb-4">
        Dashboard
      </h1>

      {loading ? (
        <p className="text-xs text-gray-500">Loading....</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
          {sellerStats.map((item, index) => (
            <StatCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default SellerDashboard;
