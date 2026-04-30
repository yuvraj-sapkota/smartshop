import {
  DollarSign,
  ShoppingCart,
  Users,
  Store,
  Wallet,
  Clock,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import PageHeader from "../../../components/PageHeader";
import StatCard from "../../../components/StatCard";

const AdminDashboard = () => {
  // 🔹 Highlights (Top KPIs)
  const highlights = [
    {
      _id: 1,
      label: "Net Profit",
      value: 1500,
      icon: DollarSign,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    {
      _id: 2,
      label: "Total Sales",
      value: 120,
      icon: ShoppingCart,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      _id: 3,
      label: "Total Users",
      value: 50,
      icon: Users,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      _id: 4,
      label: "Total Sellers",
      value: 20,
      icon: Store,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
  ];

  // 🔹 Seller Stats
  const sellerStats = [
    {
      _id: 1,
      label: "Total Commission",
      value: 1000,
      icon: Wallet,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      _id: 2,
      label: "Completed Deposit",
      value: 600,
      icon: TrendingUp,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      _id: 3,
      label: "Pending Deposit",
      value: 300,
      icon: Clock,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      _id: 4,
      label: "Outstanding Deposit",
      value: 100,
      icon: AlertCircle,
      bg: "bg-red-100",
      text: "text-red-600",
    },
  ];

  // 🔹 User Stats
  const userStats = [
    {
      _id: 1,
      label: "Total Commission",
      value: 1200,
      icon: Wallet,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      _id: 2,
      label: "Completed Withdrawal",
      value: 600,
      icon: TrendingUp,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      _id: 3,
      label: "Pending Withdrawal",
      value: 500,
      icon: Clock,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      _id: 4,
      label: "Outstanding Withdrawal",
      value: 100,
      icon: AlertCircle,
      bg: "bg-red-100",
      text: "text-red-600",
    },
  ];
  return (
    <>
      <div className="space-y-10">
        <PageHeader text="Dashboard" />

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
          {highlights.map((item, index) => (
            <StatCard key={item._id} item={item} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seller Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Seller Overview</h3>
            <div className="space-y-3">
              {sellerStats.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-semibold">Rs {item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Customer Overview</h3>
            <div className="space-y-3">
              {userStats.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-semibold">Rs {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
