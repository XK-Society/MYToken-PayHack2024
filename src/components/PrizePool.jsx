import React from "react";
import { Trophy } from "lucide-react";

const PrizePool = ({ prizes }) => {
  return (
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
  );
};

export default PrizePool;
