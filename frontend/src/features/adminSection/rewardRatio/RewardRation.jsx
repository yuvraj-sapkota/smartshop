import React from "react";
import PageHeader from "../../../components/PageHeader";
import StatCard from "../../../components/StatCard";
import { Percent, Gift, Users } from "lucide-react";

const RewardRation = () => {
  const commissionConfig = [
    {
      _id: 1,
      label: "Cashback",
      value: "25%",
      icon: Gift,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      _id: 2,
      label: "User Referral",
      value: "10%",
      icon: Users,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      _id: 3,
      label: "Seller Referral",
      value: "10%",
      icon: Percent,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  ];
  return (
    <>
      <div className="space-y-10">
        <PageHeader text="Fix Reward Ratio" />

        <div className="space-y-4 "> 
          {commissionConfig.map((item) => (
            <StatCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RewardRation;
