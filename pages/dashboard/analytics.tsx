import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { FiBarChart2, FiLink } from "react-icons/fi";
import { HiTrendingUp } from "react-icons/hi";

// Types for analytics cards
interface AnalyticsData {
  title: string;
  value: string | number;
  percentage: string;
  comparisonText: string;
  icon: React.ReactNode;
  iconClass?: string;
}

const geistSans = { className: "font-sans" };


// Analytics cards data array
const analyticsCards: AnalyticsData[] = [
  {
    title: "Total Views",
    value: 50,
    percentage: "50%",
    comparisonText: "50% from last week",
    icon: <FiBarChart2 className="w-5 h-5" />,
    iconClass: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Clicks",
    value: 0,
    percentage: "0%",
    comparisonText: "0% from last week",
    icon: <FiLink className="w-5 h-5" />,
    iconClass: "bg-blue-100 text-blue-600",
  },
  {
    title: "Conversion Rate",
    value: "0%",
    percentage: "0%",
    comparisonText: "+0% from last week",
    icon: <HiTrendingUp className="w-5 h-5" />,
    iconClass: "bg-blue-100 text-blue-600",
  },
];

const AnalyticsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className={`${geistSans.className} p-4 md:p-8`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-gray-700 mb-4">Stats & Insights</h1>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {analyticsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-5 h-[250px]"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 text-sm">{card.title}</span>
                <div className={`p-1.5 rounded-md ${card.iconClass}`}>
                  {card.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-black mb-1">{card.value}</div>
              <div
                className={`text-sm text-blue-400`}
              >
                {card.comparisonText}
              </div>
              <div className="mt-20 h-0.5 w-full bg-blue-400/50">
                <div className="h-full w-full bg-blue-400" style={{ width: card.percentage }} />
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;