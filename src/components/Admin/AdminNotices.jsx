import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react';
import Sidebar from './Sidebar';

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentNotice, setCurrentNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '서비스'
  });

  // 공지사항 목록 불러오기
  const fetchNotices = async () => {
    try {
      const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const noticeList = [];
      querySnapshot.forEach((doc) => {
        noticeList.push({ id: doc.id, ...doc.data() });
      });
      setNotices(noticeList);
      setIsLoading(false);
    } catch (error) {
      console.error('공지사항을 불러오는데 실패했습니다:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // 공지사항 추가/수정 모달 열기
  const openModal = (notice = null) => {
    if (notice) {
      setFormData({
        title: notice.title,
        content: notice.content,
        category: notice.category || '서비스'
      });
      setCurrentNotice(notice);
    } else {
      setFormData({ title: '', content: '', category: '서비스' });
      setCurrentNotice(null);
    }
    setIsModalOpen(true);
  };

  // 공지사항 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const noticeData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        updatedAt: serverTimestamp()
      };

      if (currentNotice) {
        // 수정
        await updateDoc(doc(db, 'notices', currentNotice.id), noticeData);
      } else {
        // 새로 추가
        noticeData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'notices'), noticeData);
      }

      await fetchNotices();
      setIsModalOpen(false);
      setFormData({ title: '', content: '', category: '서비스' });
    } catch (error) {
      console.error('공지사항 저장 실패:', error);
    }

    setIsLoading(false);
  };

  // 공지사항 삭제
  const handleDelete = async (noticeId) => {
    if (!window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) return;

    setIsLoading(true);
    try {
      await deleteDoc(doc(db, 'notices', noticeId));
      await fetchNotices();
    } catch (error) {
      console.error('공지사항 삭제 실패:', error);
    }
    setIsLoading(false);
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const getCategoryStyle = (category) => {
    return category === '서비스'
      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
      : 'bg-violet-100 text-violet-700 border border-violet-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900">
      <Sidebar />
      <div className="lg:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">공지사항 관리</h1>
              <p className="text-white/60 mt-2">공지사항을 등록하고 관리할 수 있습니다.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal()}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              새 공지사항
            </motion.button>
          </div>

          {/* Notices List */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
            {isLoading ? (
              <div className="p-4">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-white/5 rounded" />
                  ))}
                </div>
              </div>
            ) : notices.length > 0 ? (
              <div className="divide-y divide-white/10">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-6 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`text-sm px-3 py-1 rounded-full ${getCategoryStyle(notice.category)}`}>
                            {notice.category || '서비스'}
                          </span>
                          <h3 className="text-xl font-semibold text-white">
                            {notice.title}
                          </h3>
                        </div>
                        <p className="text-white/60 text-sm mb-4">
                          {formatDate(notice.createdAt)}
                        </p>
                        <p className="text-white/80 whitespace-pre-line">
                          {notice.content}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => openModal(notice)}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(notice.id)}
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
                등록된 공지사항이 없습니다.
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
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentNotice ? '공지사항 수정' : '새 공지사항 작성'}
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
                      카테고리
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="서비스">서비스</option>
                      <option value="업데이트">업데이트</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      제목
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="제목을 입력하세요"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-48"
                      placeholder="내용을 입력하세요"
                      required
                    />
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
                  {currentNotice ? '수정하기' : '등록하기'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminNotices;