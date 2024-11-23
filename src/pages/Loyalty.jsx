import React, { useState } from "react";
import { prizes, dailyRewards } from "../data/loyalty";
import PointsDisplay from "../components/PointsDisplay";
import PrizePool from "../components/PrizePool";
import ProgressBar from "../components/ProgressBar";
import DailyRewards from "../components/DailyRewards";
import ActionButtons from "../components/ActionButtons";

const Loyalty = () => {
  const [points, setPoints] = useState(45);
  const maxPoints = 100;

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
