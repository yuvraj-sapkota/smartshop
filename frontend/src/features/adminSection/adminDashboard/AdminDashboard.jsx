import {
  DollarSign,
  ShoppingCart,
  Users,
  Store,
  Wallet,
  Clock,
  TrendingUp,
  Package,
  AlertCircle,
  PiggyBank,
} from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import StatCard from "../../../components/StatCard";
import { useEffect, useState } from "react";
import { getAdminDashboardStatsAPI } from "../../../services/adminDashboard/adminDashboard.api";
import { showError } from "../../../utils/toast";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminDashboardStatsAPI();
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

  const h = stats?.highlights;
  const s = stats?.sellerOverview;
  const u = stats?.userOverview;

  const highlights = [
    {
      _id: 1,
      label: "Gross Profit",
      value: h?.grossProfit ?? 0,
      icon: DollarSign,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      _id: 2,
      label: "Net Profit",
      value: h?.netProfit ?? 0,
      icon: DollarSign,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    {
      _id: 3,
      label: "Total Sales",
      value: h?.totalSales ?? 0,
      icon: ShoppingCart,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      _id: 4,
      label: "Total Product",
      value: h?.totalProducts ?? 0,
      icon: Package,
      bg: "bg-indigo-100",
      text: "text-indigo-600",
    },
    {
      _id: 5,
      label: "Pending Product",
      value: h?.pendingProducts ?? 0,
      icon: Clock,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      _id: 6,
      label: "Total Users",
      value: h?.totalUsers ?? 0,
      icon: Users,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      _id: 7,
      label: "Total Sellers",
      value: h?.totalSellers ?? 0,
      icon: Store,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
  ];

  const sellerStats = [
    {
      _id: 1,
      label: "Total Commission",
      value: s?.totalCommission ?? 0,
      icon: Wallet,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      _id: 2,
      label: "Completed Deposit",
      value: s?.completedDeposit ?? 0,
      icon: TrendingUp,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      _id: 3,
      label: "Pending Deposit",
      value: s?.pendingDeposit ?? 0,
      icon: Clock,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      _id: 4,
      label: "Outstanding Deposit",
      value: s?.outstandingDeposit ?? 0,
      icon: AlertCircle,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      _id: 5,
      label: "Prepaid Amount",
      value: s?.prepaidAmount ?? 0,
      icon: PiggyBank,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
  ];

  const userStats = [
    {
      _id: 1,
      label: "Total Commission",
      value: u?.totalCommission ?? 0,
      icon: Wallet,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      _id: 2,
      label: "Completed Withdrawal",
      value: u?.completedWithdrawal ?? 0,
      icon: TrendingUp,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      _id: 3,
      label: "Pending Withdrawal",
      value: u?.pendingWithdrawal ?? 0,
      icon: Clock,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      _id: 4,
      label: "Outstanding Withdrawal",
      value: u?.outstandingWithdrawal ?? 0,
      icon: AlertCircle,
      bg: "bg-red-100",
      text: "text-red-600",
    },
  ];

  return (
    <div className="space-y-10">
      <PageHeader text="Dashboard" />

      {loading ? (
        <p className="text-xs text-gray-500">Loading....</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((item) => (
              <StatCard key={item._id} item={item} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Seller Overview</h3>
              <div className="space-y-3">
                {sellerStats.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-semibold">Rs {item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Customer Overview</h3>
              <div className="space-y-3">
                {userStats.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-semibold">Rs {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
