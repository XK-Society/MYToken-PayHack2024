import React from "react";
import TokenDashboard from "../components/TokenDashboard";
import Investment from "../components/Investment";
import Bills from "../components/Bills";
import InfoBox from "../components/InfoBox";
import Saving from "../components/Saving";
import Loan from "../components/Loan";
import Invest from "../components/Invest";
import Crypto from "../components/Crypto";

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Bottom row cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
          <Saving />
          <Loan />
          <Invest />
          <Crypto />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Dashboard - Takes up 2 columns on desktop */}
          <div className="lg:col-span-2 h-full">
            <TokenDashboard />
          </div>

          {/* Right side cards */}
          <div className="flex flex-col gap-6">
            <Investment />
            <Bills />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
