import React from 'react';
import { statsData } from '../data/statsData';

const Invest = () => {
  const { investment } = statsData;
  
  return (
    <div className="w-full flex justify-center pb-4 pr-4">
      <div className="w-full">
        <div className="p-4 h-22 bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">{investment.title}</h3>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold text-gray-900">
              {investment.value}
            </p>
            <span className={`ml-2 text-sm font-medium ${
              investment.isIncrease ? 'text-green-600' : 'text-red-600'
            }`}>
              {investment.change}
            </span>
          </div>
          <div className="mt-2 space-y-1">
            {Object.entries(investment.breakdown).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-500">{key.toUpperCase()}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invest;