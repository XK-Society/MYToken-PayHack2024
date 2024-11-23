import React from "react";

const PointsDisplay = ({ points }) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        MYToken Loyalty Rewards
      </h2>
      <div className="inline-block bg-blue-50 rounded-full px-4 py-2">
        <span className="text-xl font-bold text-blue-600">{points} Points</span>
      </div>
    </div>
  );
};

export default PointsDisplay;
