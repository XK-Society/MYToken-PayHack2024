import React from "react";
import Chart from "./Chart";
import { dashboardData } from "../data/financialData";

const Investment = () => {
  return (
    <div className="w-full flex justify-center pr-4 pb-4">
      <div className="w-full max-w-7xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Investments</h2>
        </div>

        <div>
          <Chart data={dashboardData.investments} />
        </div>

        <div className="flex flex-col">
          <div>
            <div className="bg-blue-50 p-4 rounded-lg my-4">
              <h3 className="text-lg font-semibold text-blue-800">
                Investment Portfolio
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Total Investment Value
              </p>
              <p className="text-2xl font-bold text-blue-600">
                RM {dashboardData.summary.totalInvestments.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {dashboardData.investments.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
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
    </div>
  );
};

export default Investment;
