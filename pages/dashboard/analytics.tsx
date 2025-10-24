import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', views: 4000 },
  { name: 'Feb', views: 3000 },
  { name: 'Mar', views: 2000 },
  { name: 'Apr', views: 2780 },
  { name: 'May', views: 1890 },
  { name: 'Jun', views: 2390 },
  { name: 'Jul', views: 3490 },
];

const AnalyticsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-600">Total Views</h2>
          <p className="text-xl  text-gray-800">15,234</p>
        </div>
        <div className="bg-white p-5 rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-600">Total Likes</h2>
          <p className="text-lg  text-gray-800">5,678</p>
        </div>
        <div className="bg-white p-5 rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-600">Total Shares</h2>
          <p className="text-lg  text-gray-800">1,234</p>
        </div>
      </div>
      <div className="mt-8 bg-white p-5 rounded-lg ">
       
        <LineChart width="100%" height={300} data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Line type="monotone" dataKey="views" stroke="#60A5FA" />
          <Line type="monotone" dataKey="views" stroke="#82ca9d" />
        </LineChart>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;