import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';

const TaxScheduleCalendar = () => {
  const [schedules, setSchedules] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSchedules, setSelectedSchedules] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  const yearDropdownRef = useRef(null);
  const monthDropdownRef = useRef(null);

  const fetchSchedules = useCallback(async () => {
    try {
      const q = query(collection(db, 'schedules'), orderBy('startDate', 'asc'));
      const querySnapshot = await getDocs(q);
      const scheduleList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        scheduleList.push({
          id: doc.id,
          ...data,
          startDate: data.startDate?.toDate(),
          endDate: data.endDate?.toDate()
        });
      });
      setSchedules(scheduleList);
      setIsLoading(false);
    } catch (error) {
      console.error('세무일정을 불러오는데 실패했습니다:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setIsYearOpen(false);
      }
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
        setIsMonthOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getSchedulesForDate = (date) => {
    return schedules.filter(schedule => {
      const scheduleDate = schedule.startDate;
      return scheduleDate &&
        scheduleDate.getDate() === date &&
        scheduleDate.getMonth() === currentDate.getMonth() &&
        scheduleDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const years = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i);
  const months = Array.from({ length: 12 }, (_, i) => i);

  const getDayNumber = (date) => {
    return (getFirstDayOfMonth(currentDate) + date - 1) % 7;
  };

  return (
    <div>
      {isLoading ? (
        <div className="py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto" />
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Calendar Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Year Dropdown */}
              <div className="relative" ref={yearDropdownRef}>
                <button
                  onClick={() => {
                    setIsYearOpen(!isYearOpen);
                    setIsMonthOpen(false);
                  }}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-base font-medium w-[120px] flex justify-between items-center hover:border-indigo-200 transition-colors"
                >
                  {currentDate.getFullYear()}년
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {isYearOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-20"
                    >
                      {years.map(year => (
                        <button
                          key={year}
                          onClick={() => {
                            setCurrentDate(new Date(year, currentDate.getMonth(), 1));
                            setIsYearOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 text-base transition-colors"
                        >
                          {year}년
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Month Dropdown */}
              <div className="relative" ref={monthDropdownRef}>
                <button
                  onClick={() => {
                    setIsMonthOpen(!isMonthOpen);
                    setIsYearOpen(false);
                  }}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-base font-medium w-[100px] flex justify-between items-center hover:border-indigo-200 transition-colors"
                >
                  {currentDate.getMonth() + 1}월
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {isMonthOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-20"
                    >
                      {months.map(month => (
                        <button
                          key={month}
                          onClick={() => {
                            setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
                            setIsMonthOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 text-base transition-colors"
                        >
                          {month + 1}월
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 bg-white border border-gray-200 hover:bg-gray-50 hover:border-indigo-200 rounded-lg transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 bg-white border border-gray-200 hover:bg-gray-50 hover:border-indigo-200 rounded-lg transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                <div
                  key={day}
                  className={`py-2 text-center text-sm font-medium ${
                    index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-700'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {Array.from({ length: getFirstDayOfMonth(currentDate) }, (_, i) => (
                <div key={`empty-${i}`} className="min-h-[5rem] md:h-32 border-b border-r border-gray-200" />
              ))}

              {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => {
                const date = i + 1;
                const daySchedules = getSchedulesForDate(date);
                const isToday = new Date().toDateString() ===
                  new Date(currentDate.getFullYear(), currentDate.getMonth(), date).toDateString();
                const dayNum = getDayNumber(date);

                return (
                  <div
                    key={date}
                    className={`min-h-[5rem] md:h-32 border-b border-r border-gray-200 p-2 ${
                      daySchedules.length > 0 ? 'cursor-pointer hover:bg-gray-50' : ''
                    }`}
                    onClick={() => daySchedules.length > 0 && setSelectedSchedules({ date, schedules: daySchedules })}
                  >
                    <div className={`text-right mb-1 ${
                      isToday
                        ? 'bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center ml-auto'
                        : dayNum === 0
                          ? 'text-red-500'
                          : dayNum === 6
                            ? 'text-blue-500'
                            : 'text-gray-700'
                    }`}>
                      {date}
                    </div>
                    {/* Mobile View */}
                    <div className="md:hidden">
                      {daySchedules.length > 0 && (
                        <div className="text-xs text-blue-600 text-right font-medium">
                          {daySchedules.length}개
                        </div>
                      )}
                    </div>
                    {/* Desktop View */}
                    <div className="hidden md:block space-y-1">
                      {daySchedules.slice(0, 3).map((schedule) => (
                        <div
                          key={schedule.id}
                          className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded truncate"
                        >
                          {schedule.title}
                        </div>
                      ))}
                      {daySchedules.length > 3 && (
                        <div className="text-xs text-gray-500 px-2">
                          +{daySchedules.length - 3}개 더보기
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Schedule Detail Modal */}
          <AnimatePresence>
            {selectedSchedules && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-800 to-blue-900 px-6 py-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                        <span>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월 {selectedSchedules.date}일</span>
                        <span className="text-sm bg-blue-600/50 px-2 py-1 rounded-full">
                          {selectedSchedules.schedules.length}개의 일정
                        </span>
                      </h3>
                      <button
                        onClick={() => setSelectedSchedules(null)}
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {selectedSchedules.schedules.map((schedule, index) => (
                        <div
                          key={schedule.id}
                          className="overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md"
                        >
                          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <h4 className="text-lg font-medium text-gray-900">
                              {schedule.title}
                            </h4>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-600 whitespace-pre-line">
                              {schedule.content}
                            </p>
                            {schedule.note && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-sm text-gray-500 flex items-center">
                                  <span className="font-medium mr-2">비고</span>
                                  {schedule.note}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 leading-relaxed flex items-start">
                      <span className="text-blue-500 font-bold mr-2">※</span>
                      국세 기본법 제5조(기한의특례) 규정에 따라 신고 및 납부 기한일이 공휴일/토요일 또는 근로자의 날에 해당하는 때에는
                      공휴일/토요일 또는 근로자의 날의 다음날을 기한으로 합니다.
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default TaxScheduleCalendar;