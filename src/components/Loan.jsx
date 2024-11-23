import React from "react";
import { statsData } from "../data/statsData";
import { BanknoteIcon, CarIcon } from "lucide-react";

const Loan = () => {
  const { loan } = statsData;

  return (
    <div className="w-full h-full">
      <div className="h-full min-h-[280px] p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <BanknoteIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{loan.title}</h3>
              <p className="text-sm text-gray-500">Outstanding Balance</p>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              loan.isIncrease
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {loan.change}
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900 mb-6">{loan.value}</p>

        <div className="space-y-3">
          {Object.entries(loan.breakdown).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {key === "ptptn" && (
                  <BanknoteIcon className="h-5 w-5 text-gray-500" />
                )}
                {key === "carLoan" && (
                  <CarIcon className="h-5 w-5 text-gray-500" />
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

export default Loan;
