import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { date: "10/11", views: 0 },
  { date: "10/17", views: 0 },
  { date: "10/23", views: 0 },
  { date: "10/29", views: 0 },
  { date: "11/4", views: 0 },
];
const geistSans = { className: "font-sans" };

const AnalyticsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className={`${geistSans.className} p-4 md:p-8`} >

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-gray-700">Stats & Insights</h1>
          
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {/* Top Links */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-1">Top Links</h2>
            <p className="text-sm text-gray-500">No clicks data so far.</p>
          </div>

          {/* Top Socials */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-1">Top Socials</h2>
            <p className="text-sm text-gray-500">No social clicks data so far.</p>
          </div>

          {/* Page Views */}
          <div className="bg-white border border-gray-200 rounded-xl pt-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 px-5">Page Views</h2>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="date" tickLine={false} />
                  <YAxis allowDecimals={false} tickLine={false} />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#60A5FA"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-1">Location</h2>
            <p className="text-sm text-gray-500">No location data so far.</p>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-1">Traffic Sources</h2>
            <p className="text-sm text-gray-500">No sources data so far.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;