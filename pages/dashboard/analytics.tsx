import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { FiBarChart2, FiLink, FiActivity } from "react-icons/fi";
import { motion } from "framer-motion";

interface AnalyticsData {
  title: string;
  value: string | number;
  percentage: number;
  comparisonText: string;
  icon: React.ReactNode;
}

const analyticsCards: AnalyticsData[] = [
  {
    title: "Total Views",
    value: "18.4K",
    percentage: 75,
    comparisonText: "+12.5% from last month",
    icon: <FiBarChart2 />,
  },
  {
    title: "Link Clicks",
    value: "2,842",
    percentage: 45,
    comparisonText: "+5.2% from last week",
    icon: <FiLink />,
  },
  {
    title: "Engagement Rate",
    value: "14.2%",
    percentage: 90,
    comparisonText: "+2.1% from yesterday",
    icon: <FiActivity />,
  },
];

const AnalyticsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Analytics <span className="text-gradient">Hub</span>
            </h1>
            <p className="text-white/40 text-lg font-light mt-2 italic">Deep insights into your digital presence.</p>
          </div>
          <div className="glass px-6 py-3 rounded-2xl border-white/5 text-white/40 text-sm font-bold uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Feed
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analyticsCards.map((card, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="glass-card p-8 rounded-[2.5rem] border-white/5 relative group overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                    {card.icon}
                  </div>
                  <span className="text-white/20 text-xs font-black uppercase tracking-widest">{card.title}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-5xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors">{card.value}</div>
                  <div className="text-blue-400/60 text-xs font-bold uppercase tracking-wider italic">
                    {card.comparisonText}
                  </div>
                </div>

                <div className="mt-12 h-1.5 w-full glass rounded-full overflow-hidden border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${card.percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  />
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Placeholder for future charts */}
        <div className="glass-card p-12 mb-30 md:mb-0rounded-[3rem] border-white/5 h-[400px] flex flex-col items-center justify-center text-center group">
          <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-white/10 mb-6 group-hover:scale-110 transition-transform">
            <FiActivity size={40} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Performance Graph</h3>
          <p className="text-white/20 font-light max-w-sm">Historical engagement data visualization is currently being processed by our AI engines.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;