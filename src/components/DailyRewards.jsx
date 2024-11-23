import React from "react";

const DailyRewards = ({ rewards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {rewards.map((reward, index) => (
        <div
          key={index}
          className="group bg-white rounded-lg p-4 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <reward.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{reward.label}</h4>
                <p className="text-xs text-blue-600 font-medium">
                  +{reward.points} points
                </p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-all duration-300">
              Claim
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyRewards;
