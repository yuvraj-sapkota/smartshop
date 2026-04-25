import {
  Wallet,
  DollarSign,
  TrendingUp,
  CheckCircle,
  ShoppingCart,
  Package,
} from "lucide-react";
import StatCard from "../../../components/StatCard";

const SellerDashboard = () => {
  const sellerStats = [
    {
      _id: 1,
      label: "Available Balance (prepaid)",
      value: 0,
      icon: Wallet,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    {
      _id: 2,
      label: "Due Commission",
      value: 200,
      icon: DollarSign,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      _id: 3,
      label: "Total Commission",
      value: 500,
      icon: TrendingUp,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      _id: 4,
      label: "Total Commission Paid",
      value: 300,
      icon: CheckCircle,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      _id: 5,
      label: "Total Sales",
      value: 2000,
      icon: ShoppingCart,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      _id: 6,
      label: "Total Product",
      value: 21,
      icon: Package,
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
        {sellerStats.map((item, index) => (
          <StatCard key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default SellerDashboard;
