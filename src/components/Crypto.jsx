import React from "react";
import { statsData } from "../data/statsData";
import { Bitcoin, Coins } from "lucide-react";

const Crypto = () => {
  const { crypto } = statsData;

  return (
    <div className="w-full h-full">
      <div className="h-full min-h-[280px] p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Coins className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{crypto.title}</h3>
              <p className="text-sm text-gray-500">Portfolio Value</p>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              crypto.isIncrease
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {crypto.change}
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900 mb-6">{crypto.value}</p>

        <div className="space-y-3">
          {Object.entries(crypto.breakdown).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {key === "bitcoin" && (
                  <Bitcoin className="h-5 w-5 text-gray-500" />
                )}
                {key === "ethereum" && (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 2L2 12L12 22L22 12L12 2Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {key.toUpperCase()}
                </span>
              </div>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Crypto;
