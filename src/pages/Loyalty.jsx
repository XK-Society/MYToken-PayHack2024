import React, { useState } from "react";
import { formatCurrency } from "../components/utils/format";
import { Trophy, Gift, Share2, UserPlus, Calendar, Award } from "lucide-react";

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
        {/* Header Section with Points Display */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            MYToken Loyalty Rewards
          </h2>
          <div className="inline-block bg-blue-50 rounded-full px-4 py-2">
            <span className="text-xl font-bold text-blue-600">
              {points} Points
            </span>
          </div>
        </div>

        {/* Prize Pool Section with Gradient */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <h3 className="text-xl font-bold">Lucky Winner Pool - $1000 USD</h3>
          </div>
          <div className="space-y-3">
            {prizes.map((prize, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <prize.icon className="h-5 w-5 text-yellow-400" />
                  <span>
                    {prize.winners} Winner{prize.winners > 1 ? "s" : ""}
                  </span>
                </div>
                <span className="font-bold">${prize.amount} USD</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar with Animation */}
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
            Earn {maxPoints - points} more points to qualify for monthly lucky
            draw
          </p>
        </div>

        {/* Daily Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {dailyRewards.map((reward, index) => (
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
                    <h4 className="font-semibold text-gray-800">
                      {reward.label}
                    </h4>
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

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span className="text-sm">Claim Coupon</span>
            </div>
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Daily Check-in</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loyalty;
