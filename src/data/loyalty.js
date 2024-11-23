import { Trophy, Gift, Share2, UserPlus, Calendar, Award } from "lucide-react";

export const prizes = [
  { amount: 500, label: "USD Prizepool", winners: 1, icon: Trophy },
  { amount: 300, label: "USD Prizepool", winners: 2, icon: Award },
  { amount: 200, label: "USD Prizepool", winners: 3, icon: Gift },
];

export const dailyRewards = [
  { points: 5, label: "Daily Check-in", icon: Calendar },
  { points: 10, label: "Complete Profile", icon: UserPlus },
  { points: 15, label: "Share on Social Media", icon: Share2 },
  { points: 20, label: "Refer a Friend", icon: UserPlus },
];