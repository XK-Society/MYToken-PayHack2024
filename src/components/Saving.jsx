import React from 'react'

const Saving = () => {
    const savingsStats = [
        {
          title: "Total Savings",
          value: "$12,500",
          isIncrease: true,
        },
      ];
    
      return (
        <div className="w-full flex justify-center pr-4 pb-4">
            <div className="w-full">
              {savingsStats.map((stat, index) => (
                <div key={index} className="p-4 h-22 bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <div className="flex items-baseline mt-1">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <span className={`ml-2 text-sm font-medium ${
                      stat.isIncrease ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
        </div>
      );
    };

export default Saving