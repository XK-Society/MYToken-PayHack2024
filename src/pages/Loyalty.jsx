import React, { useState } from "react";
import { Trophy, Gift, Share2, UserPlus, Calendar, Award } from "lucide-react";
import PointsDisplay from "../components/PointsDisplay";
import PrizePool from "../components/PrizePool";
import ProgressBar from "../components/ProgressBar";
import DailyRewards from "../components/DailyRewards";
import ActionButtons from "../components/ActionButtons";

const Loyalty = () => {
  const [points, setPoints] = useState(45);
  const maxPoints = 100;

  const prizes = [
    { amount: 500, label: "USD Prizepool", winners: 1, icon: Trophy },
    { amount: 300, label: "USD Prizepool", winners: 2, icon: Award },
    { amount: 200, label: "USD Prizepool", winners: 3, icon: Gift },
  ];

  const dailyRewards = [
    { points: 5, label: "Daily Check-in", icon: Calendar },
    { points: 10, label: "Complete Profile", icon: UserPlus },
    { points: 15, label: "Share on Social Media", icon: Share2 },
    { points: 20, label: "Refer a Friend", icon: UserPlus },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <PointsDisplay points={points} />
        <PrizePool prizes={prizes} />
        <ProgressBar points={points} maxPoints={maxPoints} />
        <DailyRewards rewards={dailyRewards} />
        <ActionButtons />
      </div>
    </div>
  );
};

export default Loyalty;
