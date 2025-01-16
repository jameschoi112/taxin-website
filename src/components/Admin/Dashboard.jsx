import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { app } from '../../firebase/config';
import {
  UsersIcon,
  DocumentTextIcon,
  CalendarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import Sidebar from './Sidebar';

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [analyticsData, setAnalyticsData] = useState({
    daily: 150,
    weekly: 1024,
    monthly: 4267,
    chartData: [
      { name: '월', visits: 145 },
      { name: '화', visits: 132 },
      { name: '수', visits: 164 },
      { name: '목', visits: 150 },
      { name: '금', visits: 180 },
      { name: '토', visits: 147 },
      { name: '일', visits: 142 },
    ]
  });

  useEffect(() => {
    const analytics = getAnalytics(app);
    logEvent(analytics, 'admin_dashboard_view');
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend }) => (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/60 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value.toLocaleString()}</h3>
          {trend && (
            <p className="flex items-center text-emerald-400 text-sm mt-2">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              {trend}% 증가
            </p>
          )}
        </div>
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900">
      <Sidebar />
      <div className="lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">관리자 대시보드</h1>
            <p className="text-white/60 mt-2">세무법인 택스인 관리자 페이지입니다.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="일일 방문자"
              value={analyticsData.daily}
              icon={UsersIcon}
              trend={2.5}
            />
            <StatCard
              title="주간 방문자"
              value={analyticsData.weekly}
              icon={DocumentTextIcon}
              trend={4.2}
            />
            <StatCard
              title="월간 방문자"
              value={analyticsData.monthly}
              icon={CalendarIcon}
              trend={3.8}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">일간 방문자 추이</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="visits"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                      name="방문자 수"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">요일별 방문자 현황</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="visits"
                      fill="#3b82f6"
                      name="방문자 수"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;