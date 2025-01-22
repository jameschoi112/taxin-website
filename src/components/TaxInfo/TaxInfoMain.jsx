import React, { useState, useEffect } from 'react';
import { motion} from 'framer-motion';
import { Calendar as CalendarIcon, ListFilter } from 'lucide-react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TaxScheduleList from './TaxScheduleList';
import TaxScheduleCalendar from './TaxScheduleCalendar';
import NoticeList from './NoticeList';
import ResourcesList from './ResourcesList';


const TaxInfoMain = () => {
  const [activeTab, setActiveTab] = useState('notices');
  const [calendarView, setCalendarView] = useState('list');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
  const logPageView = async () => {
    try {
      await fetch('https://us-central1-texin-e2c8b.cloudfunctions.net/logPageView', {  // 이 부분 수정
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: window.location.pathname,
          userId: 'anonymous',
          userAgent: window.navigator.userAgent
        })
      });
    } catch (error) {
      console.error('Failed to log page view:', error);
    }
  };

  logPageView();
}, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/company-bg.jpg"
            alt="Tax Information Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/90" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center max-w-6xl mx-auto px-6">
          <motion.h1
            className="text-4xl md:text-6xl text-white font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            주요세무쟁점
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            세무법인 택스인의 주요 소식과 세무 정보를 안내해드립니다
          </motion.p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
  <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
    {[
      { id: 'notices', label: '주요세무쟁점', minWidth: 'min-w-[120px]' },
      { id: 'schedule', label: '세무일정', minWidth: 'min-w-[100px]' },
      { id: 'resources', label: '자료실', minWidth: 'min-w-[90px]' }
    ].map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`${tab.minWidth} px-6 py-3 rounded-md text-sm font-medium transition-all whitespace-nowrap text-center ${
          activeTab === tab.id
            ? 'bg-blue-500 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
</div>

            {/* Content Area */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
              {activeTab === 'schedule' && (
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setCalendarView('list')}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                        calendarView === 'list'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ListFilter className="w-4 h-4 mr-2" />
                      목록형
                    </button>
                    <button
                      onClick={() => setCalendarView('calendar')}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                        calendarView === 'calendar'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      달력형
                    </button>
                  </div>
                </div>
              )}

              <div className="p-6">
                {activeTab === 'schedule' && (
                  calendarView === 'list' ? <TaxScheduleList /> : <TaxScheduleCalendar />
                )}
                {activeTab === 'notices' && <NoticeList />}
                {activeTab === 'resources' && <ResourcesList />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaxInfoMain;