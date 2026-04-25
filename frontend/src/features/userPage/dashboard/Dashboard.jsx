import {
  Wallet,
  Clock,
  TrendingUp,
  ShoppingCart,
  Gift,
  Users,
} from "lucide-react";
import StatCard from "../../../components/StatCard";

const Dashboard = () => {
  const stats = [
    {
      _id: 1,
      label: "Available Balance",
      value: 100,
      icon: Wallet,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    {
      _id: 2,
      label: "Pending Withdraw",
      value: 200,
      icon: Clock,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      _id: 3,
      label: "Total Earned",
      value: 300,
      icon: TrendingUp,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      _id: 4,
      label: "Total Purchase",
      value: 3000,
      icon: ShoppingCart,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      _id: 5,
      label: "Total Cashback",
      value: 200,
      icon: Gift,
      bg: "bg-pink-100",
      text: "text-pink-600",
    },
    {
      _id: 6,
      label: "Affiliate Rewards",
      value: 100,
      icon: Gift,
      bg: "bg-indigo-100",
      text: "text-indigo-600",
    },
    {
      _id: 7,
      label: "Affiliate Users",
      value: 10,
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
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <StatCard key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
