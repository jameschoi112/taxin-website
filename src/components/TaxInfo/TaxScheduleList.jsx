import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';

const TaxScheduleList = () => {
  const [schedules, setSchedules] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [isLoading, setIsLoading] = useState(true);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    fetchSchedules();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSchedules = async () => {
    try {
      const q = query(collection(db, 'schedules'), orderBy('startDate', 'asc'));
      const querySnapshot = await getDocs(q);

      const schedulesByMonth = {};
      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        const startDate = data.startDate?.toDate();
        if (startDate) {
          const month = startDate.getMonth() + 1;
          const day = startDate.getDate();
          if (!schedulesByMonth[month]) {
            schedulesByMonth[month] = {};
          }
          if (!schedulesByMonth[month][day]) {
            schedulesByMonth[month][day] = [];
          }
          schedulesByMonth[month][day].push({
            ...data,
            day
          });
        }
      });

      // 각 월별, 일자별로 정렬된 데이터 생성
      const sortedSchedules = {};
      Object.keys(schedulesByMonth).forEach(month => {
        sortedSchedules[month] = Object.entries(schedulesByMonth[month])
          .sort(([dayA], [dayB]) => parseInt(dayA) - parseInt(dayB))
          .map(([day, schedules]) => ({
            day: parseInt(day),
            schedules
          }));
      });

      setSchedules(sortedSchedules);
      setIsLoading(false);
    } catch (error) {
      console.error('세무일정을 불러오는데 실패했습니다:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Month Selection */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {months.map((month) => (
            <motion.button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`w-[calc(33.333%-8px)] py-2 rounded-lg text-sm font-medium transition-all transform active:scale-95
                ${selectedMonth === month
                  ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-700'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-indigo-200 shadow-sm hover:shadow'
                }`}
            >
              {month}월
            </motion.button>
          ))}
        </div>
      </div>

      {/* Schedules List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-20 mb-2" />
              <div className="h-16 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : schedules[selectedMonth]?.length > 0 ? (
        <>
          {/* PC View */}
          <div className="hidden md:block">
            <table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    날짜
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    일정
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    내용
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    비고
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {schedules[selectedMonth].flatMap(({ day, schedules }) =>
                  schedules.map((schedule, index) => (
                    <tr key={schedule.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {selectedMonth}월 {day}일
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {schedule.title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <p className="whitespace-pre-line">{schedule.content}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {schedule.note || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {schedules[selectedMonth].map(({ day, schedules }) => (
                <div
                  key={day}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                >
                  <div className="bg-gray-100 px-4 py-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-black">
                        {selectedMonth}월 {day}일
                      </p>
                      {schedules.length > 1 && (
                        <span className="text-xs bg-blue-500 px-2 py-1 rounded-full text-white">
                          {schedules.length}개의 일정
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {schedules.map((schedule, index) => (
                      <div
                        key={schedule.id}
                        className={`p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      >
                        <div className="border-l-4 border-blue-500 pl-3">
                          <h3 className="text-lg font-medium text-gray-900 mb-3">
                            {schedule.title}
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-gray-600 whitespace-pre-line">
                                {schedule.content}
                              </p>
                            </div>
                            {schedule.note && (
                              <div className="pt-2 border-t border-gray-100">
                                <p className="text-sm text-gray-500">
                                  <span className="font-medium">비고:</span> {schedule.note}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            </>
            ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
              {selectedMonth}월에 등록된 세무일정이 없습니다.
            </div>
            )}

      {/* Note */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-600 leading-relaxed">
          ※ 국세 기본법 제5조(기한의특례) 규정에 따라 신고 및 납부 기한일이 공휴일/토요일 또는 근로자의 날에 해당하는 때에는
          공휴일/토요일 또는 근로자의 날의 다음날을 기한으로 합니다.
        </p>
      </div>
    </div>
  );
};

export default TaxScheduleList;