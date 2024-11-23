import React from "react";
import Chart from "./Chart";
import { dashboardData } from "../data/financialData";

const Bills = () => {
  return (
    <div className="w-full h-full">
      <div className="h-full w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Bills</h2>
        </div>

        <div className="flex flex-col my-4">
          <div>
            <Chart data={dashboardData.bills} />
          </div>

          <div className="space-y-4"></div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800">
              Monthly Commitments
            </h3>
            <p className="text-sm text-gray-600 mt-1">Total Monthly Bills</p>
            <p className="text-2xl font-bold text-red-600">
              RM {dashboardData.summary.monthlyCommitments.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {dashboardData.bills.map((item) => (
              <div key={item.name} className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold">{item.name}</h4>
                <p className="text-lg font-bold">
                  RM {item.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;
