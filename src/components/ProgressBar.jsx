import React from "react";

const ProgressBar = ({ points, maxPoints }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Progress to Lucky Draw
        </span>
        <span className="text-sm font-bold text-blue-600">
          {points}/{maxPoints} Points
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full h-4 transition-all duration-500 ease-out"
          style={{ width: `${(points / maxPoints) * 100}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Earn {maxPoints - points} more points to qualify for monthly lucky draw
      </p>
    </div>
  );
};

export default ProgressBar;
