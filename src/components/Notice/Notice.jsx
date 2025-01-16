import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const noticesPerPage = 5;

  const loadNotices = async (isInitial = false) => {
    try {
      let q;
      if (isInitial) {
        q = query(
          collection(db, 'notices'),
          orderBy('createdAt', 'desc'),
          limit(noticesPerPage)
        );
      } else {
        if (!lastVisible) return;
        q = query(
          collection(db, 'notices'),
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible),
          limit(noticesPerPage)
        );
      }

      const querySnapshot = await getDocs(q);
      const noticeList = [];
      querySnapshot.forEach((doc) => {
        noticeList.push({ id: doc.id, ...doc.data() });
      });

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === noticesPerPage);

      if (isInitial) {
        setNotices(noticeList);
      } else {
        setNotices(prev => [...prev, ...noticeList]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('공지사항을 불러오는데 실패했습니다:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
  loadNotices(true);
}, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const NoticeCard = ({ notice }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    onClick={() => navigate(`/notice/${notice.id}`)}
    className="px-8 py-6 cursor-pointer transition-all duration-200 hover:bg-indigo-50/50 group"
  >
    <div className="space-y-2">
      <span className={`text-sm px-3 py-1 rounded-full inline-block ${getCategoryStyle(notice.category)}`}>
        {notice.category || '서비스'}
      </span>
      <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
        {notice.title}
      </h3>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {formatDate(notice.createdAt)}
        </span>
        <span className="text-sm text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
          자세히 보기 →
        </span>
      </div>
    </div>
  </motion.div>
);

  return (
    <div className="min-h-screen bg-gray-800">
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="max-w-5xl mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">공지사항</h1>
          <p className="mt-2 text-white">세무법인 택스인의 새로운 소식을 알려드립니다.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-indigo-100/50 divide-y divide-indigo-100">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="px-8 py-6 animate-pulse">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-6 w-16 bg-indigo-100 rounded-full"></div>
                    <div className="h-6 w-2/3 bg-indigo-50 rounded"></div>
                  </div>
                  <div className="h-4 w-24 bg-indigo-50 rounded"></div>
                </div>
              </div>
            ))
          ) : notices.length > 0 ? (
            <>
              {notices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
              {hasMore && (
                <div className="px-8 py-6 text-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => loadNotices(false)}
                    className="px-6 py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 border-2 border-indigo-200 hover:border-indigo-300 rounded-lg transition-colors bg-white hover:bg-indigo-50"
                  >
                    더보기
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <div className="px-8 py-12 text-center text-gray-500">
              등록된 공지사항이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notice;