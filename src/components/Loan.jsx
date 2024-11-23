import React from 'react';
import { statsData } from '../data/statsData';

const Loan = () => {
  const { loan } = statsData;
  
  return (
    <div className="w-full flex justify-center">
      <div className="w-full">
        <div className="p-4 h-22 bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">{loan.title}</h3>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold text-gray-900">
              {loan.value}
            </p>
            <span className={`ml-2 text-sm font-medium ${
              loan.isIncrease ? 'text-red-600' : 'text-green-600'
            }`}>
              {loan.change}
            </span>
          </div>
          <div className="mt-2 space-y-1">
            {Object.entries(loan.breakdown).map(([key, value]) => (
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

export default Loan;