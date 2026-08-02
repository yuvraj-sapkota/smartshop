import {
  Wallet,
  Clock,
  TrendingUp,
  ShoppingCart,
  Gift,
  Users,
  CheckCircle,
} from "lucide-react";
import StatCard from "../../../components/StatCard";
import { useEffect, useState } from "react";
import { getUserDashboardStatsAPI } from "../../../services/userDashboard/userDashboard.api";
import { showError } from "../../../utils/toast";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getUserDashboardStatsAPI();
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

  const userStats = [
    {
      _id: 1,
      label: "Available Balance",
      value: stats?.availableBalance ?? 0,
      icon: Wallet,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    {
      _id: 2,
      label: "Pending Withdraw",
      value: stats?.pendingWithdraw ?? 0,
      icon: Clock,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      _id: 8,
      label: "Completed Withdraw",
      value: stats?.completedWithdraw ?? 0,
      icon: CheckCircle,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      _id: 3,
      label: "Total Earned",
      value: stats?.totalEarned ?? 0,
      icon: TrendingUp,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      _id: 4,
      label: "Total Purchase",
      value: stats?.totalPurchase ?? 0,
      icon: ShoppingCart,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      _id: 5,
      label: "Total Cashback",
      value: stats?.totalCashback ?? 0,
      icon: Gift,
      bg: "bg-pink-100",
      text: "text-pink-600",
    },
    {
      _id: 6,
      label: "Affiliate Rewards",
      value: stats?.affiliateRewards ?? 0,
      icon: Gift,
      bg: "bg-indigo-100",
      text: "text-indigo-600",
    },
    {
      _id: 7,
      label: "Affiliate Users",
      value: stats?.affiliateUsers ?? 0,
      icon: Users,
      bg: "bg-orange-100",
      text: "text-orange-600",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {userStats.map((item) => (
            <StatCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;
