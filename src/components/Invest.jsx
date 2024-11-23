import React from "react";
import { statsData } from "../data/statsData";
import { TrendingUp, BarChart2, LineChart } from "lucide-react";

const Invest = () => {
  const { investment } = statsData;

  return (
    <div className="w-full h-full">
      <div className="h-full min-h-[280px] p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                {investment.title}
              </h3>
              <p className="text-sm text-gray-500">Portfolio Value</p>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              investment.isIncrease
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {investment.change}
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900 mb-6">
          {investment.value}
        </p>

        <div className="space-y-3">
          {Object.entries(investment.breakdown).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {key === "unitTrust" && (
                  <BarChart2 className="h-5 w-5 text-gray-500" />
                )}
                {key === "stocks" && (
                  <LineChart className="h-5 w-5 text-gray-500" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {key
                    .split(/(?=[A-Z])/)
                    .join(" ")
                    .toUpperCase()}
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

export default Invest;
