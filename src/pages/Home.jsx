import React from 'react'
import TokenDashboard from '../components/TokenDashboard'
import Investment from '../components/Investment'
import Bills from '../components/Bills'
import InfoBox from '../components/InfoBox'

const Home = () => {
  return (
    <div className="">
        <TokenDashboard />
      <div className="flex justify-between px-28">
        <Investment />
        <Bills />
      </div>
      <InfoBox />
    </div>
  )
}

export default Home