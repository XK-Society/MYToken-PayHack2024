import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Chart from './Chart';

// Historical data for analytics
const historicalData = {
  portfolio: [
    { month: 'Jan', value: 95000 },
    { month: 'Feb', value: 96500 },
    { month: 'Mar', value: 97200 },
    { month: 'Apr', value: 98800 },
    { month: 'May', value: 99100 },
    { month: 'Jun', value: 100000 },
  ],
  investments: [
    { month: 'Jan', unitTrust: 23000, stocks: 16000, crypto: 6000, gold: 4500 },
    { month: 'Feb', unitTrust: 23500, stocks: 16800, crypto: 6200, gold: 4600 },
    { month: 'Mar', unitTrust: 24000, stocks: 17200, crypto: 6500, gold: 4700 },
    { month: 'Apr', unitTrust: 24500, stocks: 17500, crypto: 6800, gold: 4800 },
    { month: 'May', unitTrust: 24800, stocks: 17800, crypto: 6900, gold: 4900 },
    { month: 'Jun', unitTrust: 25000, stocks: 18000, crypto: 7000, gold: 5000 },
  ],
  bills: [
    { month: 'Jan', housing: 2200, ptptn: 300, car: 800, utilities: 380 },
    { month: 'Feb', housing: 2200, ptptn: 300, car: 800, utilities: 390 },
    { month: 'Mar', housing: 2200, ptptn: 300, car: 800, utilities: 385 },
    { month: 'Apr', housing: 2200, ptptn: 300, car: 800, utilities: 395 },
    { month: 'May', housing: 2200, ptptn: 300, car: 800, utilities: 400 },
    { month: 'Jun', housing: 2200, ptptn: 300, car: 800, utilities: 400 },
  ]
};

const TokenDashboard = () => {
  const dashboardData = {
    overview: [
      { name: 'KWSP/EPF', value: 45000, color: '#0088FE' },
      { name: 'ASB', value: 30000, color: '#00C49F' },
      { name: 'Bank Savings', value: 15000, color: '#FFBB28' },
      { name: 'Investments', value: 10000, color: '#FF8042' }
    ]
  };

  return (
    <div className="pr-4 pb-4">
      <div className="p-6 h-full w-full bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">My Token Dashboard</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Chart data={dashboardData.overview} />
          </div>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Total Portfolio</h3>
              <p className="text-sm text-gray-600 mt-1">Combined Value</p>
              <p className="text-2xl font-bold text-green-600">
                RM 100,000
              </p>
            </div>

            {/* Portfolio Growth Chart */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Portfolio Growth</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData.portfolio}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`RM ${value.toLocaleString()}`, 'Value']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10B981" 
                      fill="#D1FAE5" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Trends */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Investment Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData.investments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `RM ${value.toLocaleString()}`}
                />
                <Line type="monotone" dataKey="unitTrust" stroke="#0088FE" name="Unit Trust" />
                <Line type="monotone" dataKey="stocks" stroke="#00C49F" name="Stocks" />
                <Line type="monotone" dataKey="crypto" stroke="#FFBB28" name="Crypto" />
                <Line type="monotone" dataKey="gold" stroke="#FF8042" name="Gold & Silver" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Bills Trends */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Monthly Bills Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData.bills}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `RM ${value.toLocaleString()}`}
                />
                <Line type="monotone" dataKey="housing" stroke="#0088FE" name="Housing" />
                <Line type="monotone" dataKey="ptptn" stroke="#00C49F" name="PTPTN" />
                <Line type="monotone" dataKey="car" stroke="#FFBB28" name="Car" />
                <Line type="monotone" dataKey="utilities" stroke="#FF8042" name="Utilities" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDashboard;