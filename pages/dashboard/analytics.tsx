import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { FiBarChart2, FiLink, FiActivity, FiTrendingUp, FiGlobe, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import { useAuth } from "../../lib/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface AnalyticsSummary {
  totalViews: number;
  totalClicks: number;
  engagementRate: number;
  topLinks: { url: string; type: string; count: number }[];
  timeSeries: { date: string; views: number; clicks: number }[];
  geoData: { country: string; count: number; code: string }[];
}

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7); // days

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;

      try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - timeRange);
        const startDateISO = startDate.toISOString();

        //  Fetch Views
        const { data: viewsData } = await supabase
          .from('profile_views')
          .select('viewed_at, viewer_country, viewer_country_code')
          .eq('profile_id', user.id)
          .gte('viewed_at', startDateISO);

        //  Fetch Clicks
        const { data: clicksData } = await supabase
          .from('link_clicks')
          .select('clicked_at, link_url, link_type, viewer_country, viewer_country_code')
          .eq('profile_id', user.id)
          .gte('clicked_at', startDateISO);

        // Process Time Series
        const dateMap: Record<string, { views: number; clicks: number }> = {};
        for (let i = 0; i < timeRange; i++) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split('T')[0];
          dateMap[dateStr] = { views: 0, clicks: 0 };
        }

        viewsData?.forEach(v => {
          const d = v.viewed_at.split('T')[0];
          if (dateMap[d]) dateMap[d].views++;
        });
        clicksData?.forEach(c => {
          const d = c.clicked_at.split('T')[0];
          if (dateMap[d]) dateMap[d].clicks++;
        });

        const timeSeries = Object.entries(dateMap)
          .map(([date, vals]) => ({
            date: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            ...vals
          }))
          .reverse();

        // Process Top Links
        const linkCounts = (clicksData || []).reduce((acc: Record<string, { url: string; type: string; count: number }>, curr) => {
          const key = `${curr.link_url}-${curr.link_type}`;
          if (!acc[key]) acc[key] = { url: curr.link_url, type: curr.link_type, count: 0 };
          acc[key].count++;
          return acc;
        }, {});
        const sortedLinks = Object.values(linkCounts).sort((a, b) => b.count - a.count).slice(0, 5);

        // Process Geo
        const geoMap: Record<string, { count: number; code: string }> = {};
        viewsData?.forEach(v => {
          const country = v.viewer_country || 'Unknown';
          if (!geoMap[country]) geoMap[country] = { count: 0, code: v.viewer_country_code || 'UN' };
          geoMap[country].count++;
        });
        const geoData = Object.entries(geoMap)
          .map(([country, vals]) => ({ country, ...vals }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);

        const views = viewsData?.length || 0;
        const clicks = clicksData?.length || 0;
        const rate = views > 0 ? (clicks / views) * 100 : 0;

        setData({
          totalViews: views,
          totalClicks: clicks,
          engagementRate: rate,
          topLinks: sortedLinks,
          timeSeries,
          geoData
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user, timeRange]);

  const cards = [
    { title: "Total Views", value: loading ? "..." : data?.totalViews.toLocaleString(), icon: <FiBarChart2 />, color: "text-blue-400" },
    { title: "Link Clicks", value: loading ? "..." : data?.totalClicks.toLocaleString(), icon: <FiLink />, color: "text-purple-400" },
    { title: "Engagement", value: loading ? "..." : `${data?.engagementRate.toFixed(1)}%`, icon: <FiActivity />, color: "text-emerald-400" },
  ];

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl">
          <p className="text-white/40 text-[10px] uppercase font-black mb-2 tracking-widest">{label}</p>
          <div className="space-y-1">
            <p className="text-blue-400 text-sm font-black flex items-center justify-between gap-8">
              Views <span className="text-white">{payload[0].value}</span>
            </p>
            <p className="text-purple-400 text-sm font-black flex items-center justify-between gap-8">
              Clicks <span className="text-white">{payload[1].value}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="space-y-12 pb-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Analytics <span className="text-gradient">Hub</span>
            </h1>
            <p className="text-white/40 text-lg font-light mt-2 italic">Detailed traffic and conversion insights.</p>
          </div>

          <div className="flex items-center gap-2 glass p-1.5 rounded-2xl border-white/5">
            {[7, 30, 90].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`relative px-6 py-2.5 cursor-pointer rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${timeRange === r
                  ? 'text-black'
                  : 'text-white/20 hover:text-white/40'
                  }`}
              >
                <span className="relative z-10">{r} Days</span>
                {timeRange === r && (
                  <motion.div
                    layoutId="activeRange"
                    className="absolute inset-0 bg-white rounded-xl shadow-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-10">
                <div className={`w-12 h-12 glass rounded-2xl flex items-center justify-center ${card.color}`}>
                  {card.icon}
                </div>
                <span className="text-white/20 text-[10px] font-black uppercase tracking-widest leading-none mt-1">{card.title}</span>
              </div>
              <div className="text-5xl font-black text-white tracking-tighter">{card.value}</div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 blur-[50px] rounded-full group-hover:bg-white/10 transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Performance Graph */}
        <div className="glass-card p-8 md:p-12 rounded-[3.5rem] border-white/5 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-blue-400">
                <FiCalendar size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Traffic Over Time</h3>
                <p className="text-white/20 text-[10px] uppercase font-black tracking-widest">Views vs Link Clicks</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-[10px] font-black uppercase text-white/40">Views</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500" /><span className="text-[10px] font-black uppercase text-white/40">Clicks</span></div>
            </div>
          </div>

          <div className="h-[400px] w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.timeSeries || []}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#a855f7"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Links */}
          <div className="glass-card p-10 rounded-[3rem] border-white/5">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-purple-400">
                <FiTrendingUp size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Top performing</h2>
                <p className="text-white/20 text-[10px] uppercase font-black tracking-widest">Most clicked assets</p>
              </div>
            </div>
            <div className="space-y-3">
              {data?.topLinks.map((link, i) => (
                <div key={i} className="glass p-5 rounded-2xl border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/20">
                      {link.type === 'social' ? <FiActivity size={16} /> : <FiLink size={16} />}
                    </div>
                    <div className="max-w-[200px] md:max-w-xs truncate">
                      <div className="text-white font-bold text-sm truncate">{link.url}</div>
                      <div className="text-[10px] text-white/20 font-black uppercase">{link.type}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-white">{link.count}</div>
                </div>
              ))}
              {data?.topLinks.length === 0 && <div className="py-20 text-center text-white/10 uppercase tracking-widest font-black">No clicks recorded</div>}
            </div>
          </div>

          {/* Geo Insights */}
          <div className="glass-card p-10 rounded-[3rem] border-white/5">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-emerald-400">
                <FiGlobe size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Geo Insights</h2>
                <p className="text-white/20 text-[10px] uppercase font-black tracking-widest">Views by country</p>
              </div>
            </div>

            <div className="space-y-6">
              {data?.geoData.map((geo, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase">
                    <div className="flex items-center gap-3">
                      <span className="text-white/20">{geo.code}</span>
                      <span className="text-white">{geo.country}</span>
                    </div>
                    <span className="text-emerald-400">{geo.count} Views</span>
                  </div>
                  <div className="h-1.5 w-full glass rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(geo.count / data.totalViews) * 100}%` }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
              {data?.geoData.length === 0 && <div className="py-20 text-center text-white/10 uppercase tracking-widest font-black">No geo data yet</div>}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;