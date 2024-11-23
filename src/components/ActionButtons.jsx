import React from "react";
import { Gift, Calendar } from "lucide-react";

const ActionButtons = () => {
  return (
    <div className="flex justify-center gap-4">
      <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-2">
          <Gift className="h-4 w-4" />
          <span className="text-sm">Claim Coupon</span>
        </div>
      </button>
      <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">Daily Check-in</span>
        </div>
      </button>
    </div>
  );
};

export default ActionButtons;
