import React from 'react'
import Chart from './Chart'

const Bills = () => {
    const billData = [
        { name: 'Group A', value: 400, color: '#0088FE' },
        { name: 'Group B', value: 300, color: '#00C49F' },
        { name: 'Group C', value: 200, color: '#FFBB28' },
        { name: 'Group D', value: 100, color: '#FF8042' }
      ];
  return (
    <div className="w-full flex justify-center pb-4">
    <div className="w-full max-w-7xl p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center">
          <h2 className="text-xl font-bold text-gray-800">Bills</h2>
      </div>
      <Chart data={billData}/>
    </div>
  </div>
  )
}

export default Bills