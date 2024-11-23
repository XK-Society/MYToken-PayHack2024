import React from 'react'
import TokenDashboard from '../components/TokenDashboard'
import Investment from '../components/Investment'
import Bills from '../components/Bills'
import InfoBox from '../components/InfoBox'
import Saving from '../components/Saving'
import Loan from '../components/Loan'
import Invest from '../components/Invest'
import Crypto from '../components/Crypto'

const Home = () => {
  return (
    <div className="grid grid-cols-2 p-4">
      <TokenDashboard />
      <div className="grid grid-cols-2">
        <Investment />
        <Bills />
        <Saving />
        <Loan />
        <Invest />
        <Crypto />
      </div>
    </div>
  )
}

export default Home