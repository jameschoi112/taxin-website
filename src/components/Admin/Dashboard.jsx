import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { app, db } from '../../firebase/config';
import {
  UsersIcon,
  DocumentTextIcon,
  CalendarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    chartData: [],
    isLoading: true
  });

  useEffect(() => {
    // 현재 페이지 보기 이벤트 기록
    const analytics = getAnalytics(app);
    logEvent(analytics, 'admin_dashboard_view');

    // 방문자 데이터 가져오기
    const fetchAnalyticsData = async () => {
      try {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        // 일일 방문자
        const dailyStats = await getDocs(query(
          collection(db, 'analytics'),
          where('timestamp', '>=', today),
          orderBy('timestamp', 'desc')
        ));

        // 주간 방문자
        const weeklyStats = await getDocs(query(
          collection(db, 'analytics'),
          where('timestamp', '>=', weekAgo),
          orderBy('timestamp', 'desc')
        ));

        // 월간 방문자
        const monthlyStats = await getDocs(query(
          collection(db, 'analytics'),
          where('timestamp', '>=', monthAgo),
          orderBy('timestamp', 'desc')
        ));

        // 일간 차트 데이터 구성
        const chartData = [];
        const days = ['일', '월', '화', '수', '목', '금', '토'];

        // 최근 7일간의 데이터 수집
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
          const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);

          const dayStats = await getDocs(query(
            collection(db, 'analytics'),
            where('timestamp', '>=', date),
            where('timestamp', '<', nextDate)
          ));

          chartData.push({
            name: days[date.getDay()],
            visits: dayStats.size || 0
          });
        }

        // 증가율 계산
        const calculateGrowth = (current, previous) => {
          if (previous === 0) return 0;
          return ((current - previous) / previous * 100).toFixed(1);
        };

        // 전날 데이터와 비교
        const yesterdayStats = await getDocs(query(
          collection(db, 'analytics'),
          where('timestamp', '>=', new Date(today.getTime() - 24 * 60 * 60 * 1000)),
          where('timestamp', '<', today)
        ));

        // 전주 데이터와 비교
        const lastWeekStats = await getDocs(query(
          collection(db, 'analytics'),
          where('timestamp', '>=', new Date(weekAgo.getTime() - 7 * 24 * 60 * 60 * 1000)),
          where('timestamp', '<', weekAgo)
        ));

        // 전월 데이터와 비교
        const lastMonthStats = await getDocs(query(
          collection(db, 'analytics'),
          where('timestamp', '>=', new Date(monthAgo.getTime() - 30 * 24 * 60 * 60 * 1000)),
          where('timestamp', '<', monthAgo)
        ));

        setAnalyticsData({
          daily: dailyStats.size,
          weekly: weeklyStats.size,
          monthly: monthlyStats.size,
          dailyGrowth: calculateGrowth(dailyStats.size, yesterdayStats.size),
          weeklyGrowth: calculateGrowth(weeklyStats.size, lastWeekStats.size),
          monthlyGrowth: calculateGrowth(monthlyStats.size, lastMonthStats.size),
          chartData,
          isLoading: false
        });
      } catch (error) {
        console.error('방문자 데이터 가져오기 실패:', error);
        setAnalyticsData(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchAnalyticsData();

    // 5분마다 데이터 갱신
    const interval = setInterval(fetchAnalyticsData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, icon: Icon, growth }) => (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/60 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">
            {value.toLocaleString()}
          </h3>
          {growth && (
            <p className={`flex items-center text-sm mt-2 ${
              parseFloat(growth) >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              <ArrowTrendingUpIcon className={`w-4 h-4 mr-1 ${
                parseFloat(growth) >= 0 ? '' : 'transform rotate-180'
              }`} />
              {Math.abs(growth)}% {parseFloat(growth) >= 0 ? '증가' : '감소'}
            </p>
          )}
        </div>
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
    </div>
  );

  if (analyticsData.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900">
        <Sidebar />
        <div className="lg:ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-white/10 rounded w-48 mb-4" />
              <div className="h-4 bg-white/10 rounded w-96 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-white/10 rounded-xl" />
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="h-96 bg-white/10 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              growth={analyticsData.dailyGrowth}
            />
            <StatCard
              title="주간 방문자"
              value={analyticsData.weekly}
              icon={DocumentTextIcon}
              growth={analyticsData.weeklyGrowth}
            />
            <StatCard
              title="월간 방문자"
              value={analyticsData.monthly}
              icon={CalendarIcon}
              growth={analyticsData.monthlyGrowth}
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