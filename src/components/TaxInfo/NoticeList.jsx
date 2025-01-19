// src/components/TaxInfo/NoticeList.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ChevronRight } from 'lucide-react';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getCategoryStyle = (category) => {
    return category === '서비스'
      ? 'bg-blue-50 text-blue-600 border-blue-100'
      : 'bg-violet-50 text-violet-600 border-violet-100';
  };

  return (
    <div>
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : notices.length > 0 ? (
        <div className="space-y-4">
          {notices.map((notice) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => window.location.href = `/notice/${notice.id}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className={`text-sm px-3 py-1 rounded-full border ${getCategoryStyle(notice.category)}`}>
                    {notice.category || '서비스'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(notice.createdAt)}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {notice.title}
              </h3>
              <p className="text-gray-600 line-clamp-2">
                {notice.content}
              </p>
            </motion.div>
          ))}

          {hasMore && (
            <div className="text-center pt-4">
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
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg border border-gray-200 text-center text-gray-500">
          등록된 공지사항이 없습니다.
        </div>
      )}
    </div>
  );
};

export default NoticeList;