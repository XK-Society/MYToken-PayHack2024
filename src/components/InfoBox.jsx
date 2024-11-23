import React from 'react'

const InfoBox = () => {
    const savingsStats = [
        {
          title: "Total Savings",
          value: "$12,500",
          change: "+8.2%",
          isIncrease: true,
        },
        {
          title: "Monthly Income",
          value: "$3,200",
          change: "+12.5%",
          isIncrease: true,
        },
        {
          title: "Monthly Expenses",
          value: "$2,100",
          change: "-3.4%",
          isIncrease: false,
        },
        {
          title: "Net Savings",
          value: "$1,100",
          change: "+15.3%",
          isIncrease: true,
        }
      ];
    
      return (
        <div className="w-full flex justify-center pt-0 pb-2">
          <div className="w-full max-w-7xl p-6 bg-white rounded-lg shadow-lg">
       
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savingsStats.map((stat, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow">
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
        </div>
      );
    };
export default InfoBox