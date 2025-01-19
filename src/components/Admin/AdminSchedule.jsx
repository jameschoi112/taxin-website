import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Calendar as  Plus, X, Check, Trash2, Pencil } from 'lucide-react';
import Sidebar from './Sidebar';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AdminSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    startDate: new Date(),
    endDate: new Date(),
    isRecurring: false,
    note: ''
  });

  // 세무일정 목록 불러오기
  const fetchSchedules = async () => {
    try {
      const q = query(collection(db, 'schedules'), orderBy('startDate', 'asc'));
      const querySnapshot = await getDocs(q);
      const scheduleList = [];
      querySnapshot.forEach((doc) => {
        scheduleList.push({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data().startDate?.toDate(),
          endDate: doc.data().endDate?.toDate()
        });
      });
      setSchedules(scheduleList);
      setIsLoading(false);
    } catch (error) {
      console.error('세무일정을 불러오는데 실패했습니다:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // 세무일정 추가/수정 모달 열기
  const openModal = (schedule = null) => {
    if (schedule) {
      setFormData({
        title: schedule.title,
        content: schedule.content,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        isRecurring: schedule.isRecurring || false,
        note: schedule.note || ''
      });
      setCurrentSchedule(schedule);
    } else {
      setFormData({
        title: '',
        content: '',
        startDate: new Date(),
        endDate: new Date(),
        isRecurring: false,
        note: ''
      });
      setCurrentSchedule(null);
    }
    setIsModalOpen(true);
  };

  // 세무일정 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const scheduleData = {
        title: formData.title,
        content: formData.content,
        startDate: formData.startDate,
        endDate: formData.endDate,
        isRecurring: formData.isRecurring,
        note: formData.note,
        updatedAt: serverTimestamp()
      };

      if (currentSchedule) {
        await updateDoc(doc(db, 'schedules', currentSchedule.id), scheduleData);
      } else {
        scheduleData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'schedules'), scheduleData);
      }

      await fetchSchedules();
      setIsModalOpen(false);
    } catch (error) {
      console.error('세무일정 저장 실패:', error);
    }

    setIsLoading(false);
  };

  // 세무일정 삭제
  const handleDelete = async (scheduleId) => {
    if (!window.confirm('정말로 이 세무일정을 삭제하시겠습니까?')) return;

    setIsLoading(true);
    try {
      await deleteDoc(doc(db, 'schedules', scheduleId));
      await fetchSchedules();
    } catch (error) {
      console.error('세무일정 삭제 실패:', error);
    }
    setIsLoading(false);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900">
      <Sidebar />
      <div className="lg:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">세무일정 관리</h1>
              <p className="text-white/60 mt-2">세무일정을 등록하고 관리할 수 있습니다.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal()}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              새 일정 등록
            </motion.button>
          </div>

          {/* Schedules List */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
            {isLoading ? (
              <div className="p-4">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-white/5 rounded" />
                  ))}
                </div>
              </div>
            ) : schedules.length > 0 ? (
              <div className="divide-y divide-white/10">
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="p-6 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {schedule.isRecurring && (
                            <span className="text-sm px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                              반복
                            </span>
                          )}
                          <h3 className="text-xl font-semibold text-white">
                            {schedule.title}
                          </h3>
                        </div>
                        <p className="text-white/60 text-sm mb-2">
                          {formatDate(schedule.startDate)} - {formatDate(schedule.endDate)}
                        </p>
                        <p className="text-white/80 whitespace-pre-line">
                          {schedule.content}
                        </p>
                        {schedule.note && (
                          <p className="text-white/60 text-sm mt-2">
                            비고: {schedule.note}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => openModal(schedule)}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(schedule.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-white/60">
                등록된 세무일정이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl"
          >
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentSchedule ? '세무일정 수정' : '새 세무일정 등록'}
                    </h3>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      제목
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="세무일정 제목을 입력하세요"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      내용
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                      placeholder="세무일정 내용을 입력하세요"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        시작일
                      </label>
                      <DatePicker
                        selected={formData.startDate}
                        onChange={(date) => setFormData({ ...formData, startDate: date })}
                        dateFormat="yyyy/MM/dd"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        종료일
                      </label>
                      <DatePicker
                        selected={formData.endDate}
                        onChange={(date) => setFormData({ ...formData, endDate: date })}
                        dateFormat="yyyy/MM/dd"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      비고
                    </label>
                    <input
                      type="text"
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="비고 사항을 입력하세요 (선택사항)"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isRecurring"
                      checked={formData.isRecurring}
                      onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                      className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isRecurring" className="text-sm text-gray-700">
                      매년 반복되는 일정
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                  disabled={isLoading}
                >
                  <Check className="w-5 h-5 mr-2" />
                  {currentSchedule ? '수정하기' : '등록하기'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminSchedule;