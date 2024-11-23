import React from 'react'
import Chart from './Chart'

const TokenDashboard = () => {
  return (
    <div className="w-full flex justify-center pt-2">
      <div className="w-full max-w-7xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">My Token Dashboard</h2>
        </div>
        <Chart />
      </div>
    </div>
  )
}

export default TokenDashboard