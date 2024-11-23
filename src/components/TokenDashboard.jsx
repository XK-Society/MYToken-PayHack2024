import React from 'react'
import Chart from './Chart'

const TokenDashboard = () => {
  const tokenData = [
    { name: 'Group A', value: 400, color: '#0088FE' },
    { name: 'Group B', value: 300, color: '#00C49F' },
    { name: 'Group C', value: 200, color: '#FFBB28' },
    { name: 'Group D', value: 100, color: '#FF8042' }
  ];

  return (
    <div className="pr-4 pb-4">
      <div className="p-6 h-full w-ful bg-white rounded-lg shadow-lg">
        <div className="flex justify-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">My Token Dashboard</h2>
        </div>
        <Chart data={tokenData}/>
      </div>
    </div>
  )
}

export default TokenDashboard